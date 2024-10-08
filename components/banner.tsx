import Image from "next/image"
import Link from "next/link"


export default function Banner() {
    return(
        <>
        <div className="banner">
          <Link
          href={"https://fredagain.lnk.to/tendays"}
          >
            <b>ten days</b> out now.
          </Link>
          
        </div>
      
        </>
    )
}
