import Link from "next/link"
import Image from "next/image"
export default function HomeContent()
{
    return(
        <div className="box box-content flex justify-center items-center flex-col relative">
                <h1 className="header font-baloo text-4xl">
                    Welcome To DashBoard
                </h1>
                <p className="pt-1 text-gray-500">
                    To start your project you need to click this button
                </p>
                <Link
                    href="/dashboard/project"
                    className="btn-home mt-4 px-4 py-2 rounded-xl text-white bg-blue-700 text-center"
                >
                    Go Project
                </Link>

                <Image
                    src="/image/cheese-hi.svg"
                    alt="cheese"
                    width={1000} // Điều chỉnh kích thước phù hợp
                    height={250}
                    className="absolute -bottom-3 right-28 be-cheese"
                />
            </div>
    )
}