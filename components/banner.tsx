import Link from "next/link"

export default function Banner() {
    return(
        <>
        <div className="banner">
        <Link href={"mailto:kai@coleridge.dev"}>spot any bugs? 🐛 <span>email me</span></Link>
        </div>
        </>
    )
}