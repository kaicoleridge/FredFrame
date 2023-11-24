'use client';

import { useEdgeStore } from "@/app/lib/edgestore";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import { saveAs } from "file-saver";
import Confetti from 'react-confetti'

export default function UploadImage() {
    const [file, setFile] = useState<File>();
    const [error, setError] = useState("")
    const [loading, isLoading] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState<string>('')
    const [url, setURL] = useState<{ url: string }>()
    const { edgestore } = useEdgeStore();
    const Jimp = require('jimp')

    const downloadImage = () => {
        let imageURL = url?.url;
        saveAs(`${imageURL}`, "FredFrameAgain - " + Date().slice(0, 15))
    }

    async function processImage() {
        try {
            if (file) {
                const buffer = Buffer.from(await file.arrayBuffer());
                let processedImage = await Jimp.read(buffer);
    
                switch (selectedFilter) {
                    case 'actual-life':
                        processedImage = processedImage.color([
                            { apply: 'red', params: [185] },
                            { apply: 'blue', params: [0] },
                            { apply: 'green', params: [5] },
                            { apply: 'lighten', params: [-15] },
                        ])
                        .resize(600, 600)
                        .quality(100);
                        break;
                    case 'actual-life-2':
                        processedImage = processedImage.color([
                            { apply: 'red', params: [300] },
                            { apply: 'blue', params: [1] },
                            { apply: 'green', params: [110] },
                            { apply: 'lighten', params: [-25] },
                        ])
                        .resize(600, 600)
                        .quality(100);
                        break;
                    case 'actual-life-3':
                        processedImage = processedImage.color([
                            { apply: 'red', params: [0] },
                            { apply: 'blue', params: [400] },
                            { apply: 'green', params: [0] },
                            { apply: 'lighten', params: [-30] },
                        ])
                        .resize(600, 600)
                        .quality(100);
                        
                        break;
                    default:
                        isLoading(false)
                        return setError('Error! Pick a filter');
                }
    
                return processedImage;
            }
        } catch (error) {
            console.error('Error converting ArrayBuffer to Buffer:', error);
            return null;
        }
        return null;
    }
    
    async function handleImageUpload() {
        if (file) {

            if (file.size > 1024 * 1024 * 2) {
                setError('Allowed file size exceeded. File size should be 2MB or less.');
                return;
            }
            isLoading(true)
            const processedImage = await processImage();
            

            if (!processedImage) {
                setError('Error processing image. Please select a filter');
                return;
            }
            try {
                // Convert the processed image to a base64 string
                const base64String = await processedImage.getBase64Async(Jimp.MIME_PNG);

                // Convert the base64 string back to a Blob
                const blob = await fetch(base64String).then((final) => final.blob());

                // Create a new File from the Blob
                const modifiedFile = new File([blob], 'modified_image.png', { type: Jimp.MIME_PNG });

                // Upload the modified image to EdgeStore
                const res = await edgestore.publicFiles.upload({
                    file: modifiedFile,
                    options: {
                        temporary: true,
                    },
                });

                setURL({
                    url: res.url,
                });
                isLoading(false)
                setError('');
                console.log(res);
            } catch (error) {
                setError('Error uploading file to server: ' + error);
            }
        } else {
            setError('No image found. Please upload either a JPEG or PNG file.');
        }
    }


    return (
        <div>
            <input
                type="file"
                onChange={(e) => {
                    setFile(e.target.files?.[0]);
                }}
                id='fileImage'
                accept="image/png, image/jpeg"
            >
            </input>
            <select defaultValue={"choose-filter"} id="choose-filter" onChange={(e) => setSelectedFilter(e.target.value)}>
                <option value={'DEFAULT'} defaultChecked>choose filter {'>'}</option>
                <option value={'actual-life'}>Actual Life</option>
                <option value={'actual-life-2'}>Actual Life 2</option>
                <option value={'actual-life-3'}>Actual Life 3</option>
            </select>

            <div className="flex items-center justify-center bg-black">
                {url?.url && <img id={"placeholder"} src={url.url} alt="generated-image" width={470} height={470} />}
            </div>
            
            <p id="error">{error}</p>
            <ClipLoader
            color="white"
            loading={loading}
            size={50}
            />

            <div className="mx-9">
                {url?.url && <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={950}
                    colors={['#FF8A00', '#D40414', '#1f1fc2']}
                    recycle={false}
                ></Confetti>}
                {url?.url && <button className="text-red" id="download" onClick={downloadImage}>Download</button>}
            </div>

            <div>
                {!url?.url && <button type="submit" id="upld" onClick={handleImageUpload}>upload.</button>}
                {url?.url && <a href="/">
                    <button>
                        Generate another image?
                    </button>
                </a>}
                <div>
                </div>
            </div>

        </div>


    )
}

