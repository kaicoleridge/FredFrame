'use client';

import { useEdgeStore } from "@/app/lib/edgestore";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import { saveAs } from "file-saver";
import Confetti from 'react-confetti';
import Image from 'next/image';

export default function UploadImage() {
    const [file, setFile] = useState<File>();
    const [error, setError] = useState("");
    const [loading, isLoading] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string>('');
    const [url, setURL] = useState<{ url: string }>();
    const { edgestore } = useEdgeStore();
    const Jimp = require('jimp');

    const downloadImage = () => {
        let imageURL = url?.url;
        saveAs(`${imageURL}`, "FredFrameAgain - " + Date().slice(0, 15));
    }

    const GDPRConfirm = () => {
        return confirm("In alignment with the General Data Protection Regulation (GDPR) in the UK and EU, images submitted for use on FredFrameAgain undergo processing on a server. Uploaded images are immediately deleted from servers upon selecting 'Generate another image?' By default, images are removed 24 hours from the date and time of the upload.\n\nBy proceeding, you agree to these terms.");
    }

    async function processImage() {
        try {
            if (file) {
                const buffer = Buffer.from(await file.arrayBuffer());
                let processedImage = await Jimp.read(buffer);
                switch (selectedFilter) {
                    case 'actual-life':
                        processedImage = processedImage.color([
                            { apply: 'red', params: [140] },
                            { apply: 'green', params: [-5] },
                            { apply: 'blue', params: [0] },
                            { apply: 'lighten', params: [-3] },
                        ])
                        break; 
                
                    case 'actual-life-2':
                        processedImage = processedImage.color([
                            { apply: 'red', params: [500] },
                            { apply: 'green', params: [100] },
                            { apply: 'blue', params: [0] },
                            { apply: 'lighten', params: [-3] },
                        ])
                        break; 
                
                    case 'actual-life-3':
                        processedImage = processedImage.color([
                            { apply: 'red', params: [0] },
                            { apply: 'green', params: [0] },
                            { apply: 'blue', params: [400] },
                            { apply: 'lighten', params: [-30] },
                        ])
                        break; 
                
                    default:
                        isLoading(false);
                        setError('Error! Pick a filter');
                        return null;
                }

                processedImage = processedImage.quality(95)
                
                return processedImage;
            }
        } catch (error) {
            console.error('Error converting ArrayBuffer to Buffer:', error);
            return null;
        }


    }

    async function handleImageUpload() {
        const alllowedAllocatedUpload = 1024 * 1024 * 2
        setError('')
        if (file) {
            if (GDPRConfirm()) {

                if (file.size > alllowedAllocatedUpload) {
                    setError('Allowed file size exceeded. File size should be 2MB or less.');
                    return;
                }

                isLoading(true);
                const processedImage = await processImage();

                if (!processedImage) {
                    setError('Error processing image. Please select a filter');
                    return;
                }
                
                try {
                    const buffer = await processedImage.getBufferAsync(Jimp.AUTO);
                    const modifiedFile = new File([buffer], 'modified_image.jpeg', { type: 'image/jpeg' });                    

                    const res = await edgestore.publicFiles.upload({
                        file: modifiedFile,
                        options: {
                            temporary: true,
                        },
                    });

                    setURL({
                        url: res.url,
                    });
                    isLoading(false);
                    setError('');
                } catch (error) {
                    setError('Error uploading file to server: ' + error);
                }
            }
        } else {
            setError('No image found. Please upload either a JPEG or PNG file.');
        }
    }


    async function deleteImage() {
        await edgestore.publicFiles.delete({
            url: url!.url
        })
    }

    return (
        <div>
            <input
                type="file"
                onChange={(e) => {
                    setFile(e.target.files?.[0]);
                }}
                id='fileImage'
                accept="image/png, image/jpeg, .heic"
            >
            </input>
            <select defaultValue={"choose-filter"} id="choose-filter" onChange={(e) => setSelectedFilter(e.target.value)}>
                <option value={'DEFAULT'} defaultChecked>choose filter {'>'}</option>
                <option value={'actual-life'}>Actual Life</option>
                <option value={'actual-life-2'}>Actual Life 2</option>
                <option value={'actual-life-3'}>Actual Life 3</option>
            </select>

            <div className="flex items-center justify-center bg-black">
                {url?.url && <Image id={"placeholder"} src={url.url} alt="generated-image" width={470} height={470} />}
            </div>

            <p id="error">{error}</p>
            <ClipLoader
                color="white"
                loading={loading}
                size={60}
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
                    <button onClick={deleteImage}>
                        Generate another image?
                    </button>
                </a>}
                <div>
                </div>
            </div>
        </div>
    );
}
