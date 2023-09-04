import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <>
      <div className=" bg-neutral-900  pb-20  overflow-auto h-screen md:w-3/4">
        <div className="   rounded-md ">
          <div className=" md:p-10 animate__animated animate__fadeIn flex justify-center align-item items-center">
            <h1 className="text-6xl font-bold  text-white font-bold ">
              About Developer
            </h1>
          </div>
          <div className=" md:p-10 animate__animated animate__fadeIn flex justify-center align-item items-center">
            <p className="text-xs  text-gray-400 font-bold ">
              Hi, I am Intizam khozim almanar Someone who love learn something
              new. especially about web programming and web design. happy to
              share about knowledge and learn from other
            </p>
          </div>
          <div className="m-5">
            <div className=" w-60 h-60 flex justify-center align-item items-center rounded-lg m-5 bg-neutral-800 drop-shadow-2xl">
              <div className="">
                <div className=" m-3">
                  <h1 className="text-2xl font-bold underline decoration-teal-400">
                    Technologies
                  </h1>
                </div>
                <div className="m-3  w-52">
                  <Link href="https://legacy.reactjs.org/docs/hooks-intro.html">
                    <div className=" flex m-3">
                      <div className="">
                        <Image
                          width={24}
                          height={24}
                          className="w-6 h-6"
                          src="/reactWhite.png"
                          alt=""
                        />
                      </div>
                      <div className="flex justify-center align-item items-center ms-1 font-semibold text-xs">
                        <h1>React Hooks</h1>
                      </div>
                    </div>
                  </Link>
                  <Link href="https://legacy.reactjs.org/docs/hooks-intro.html">
                    <div className=" flex m-3">
                      <div className="rounded-full">
                        <Image
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full"
                          src="/nextWhite.jpg"
                          alt=""
                        />
                      </div>
                      <div className="flex justify-center align-item items-center ms-1 font-semibold text-xs">
                        <h1>Next Js</h1>
                      </div>
                    </div>
                  </Link>
                  <Link href="https://tailwindcss.com/">
                    <div className=" flex m-3">
                      <div className="rounded-full">
                        <Image
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full"
                          src="/tailwindWhite.png"
                          alt=""
                        />
                      </div>
                      <div className="flex justify-center align-item items-center ms-1 font-semibold text-xs">
                        <h1>Tailwind</h1>
                      </div>
                    </div>
                  </Link>
                  <Link href="https://vercel.com/dashboard">
                    <div className=" flex m-3">
                      <div className="rounded-full">
                        <Image
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full"
                          src="/vercelWhite.png"
                          alt=""
                        />
                      </div>
                      <div className="flex justify-center align-item items-center ms-1 font-semibold text-xs">
                        <h1>Vercel</h1>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className=" w-60 h-60 flex justify-center align-item items-center rounded-lg m-5 bg-neutral-800 drop-shadow-2xl">
              <div>
                <div className="m-3 ">
                  <h1 className="text-2xl font-bold underline decoration-teal-400">
                    Contact
                  </h1>
                </div>
                <div className="m-3  w-52">
                  <Link href="https://github.com/intizam11">
                    <div className="  flex m-3">
                      <div className="">
                        <Image
                          width={24}
                          height={24}
                          className="w-6 h-6"
                          src="/githubWhite.png"
                          alt=""
                        />
                      </div>
                      <div className="flex justify-center align-item items-center ms-1 font-semibold text-xs">
                        <h1>intizam11</h1>
                      </div>
                    </div>
                  </Link>
                  <Link href="https://www.linkedin.com/in/intizam-khozim-almanar/">
                    <div className="  flex m-3">
                      <div className="">
                        <Image
                          width={24}
                          height={24}
                          className="w-6 h-6"
                          src="/linkindWhite.png"
                          alt=""
                        />
                      </div>
                      <div className="flex justify-center align-item items-center ms-1 font-semibold text-xs">
                        <h1>Intizam Khozim Almanar </h1>
                      </div>
                    </div>
                  </Link>
                  <Link href="https://intizamkz@gmail.com">
                    <div className="  flex m-3">
                      <div className="">
                        <Image
                          width={24}
                          height={24}
                          className="w-6 h-6"
                          src="/mail.png"
                          alt=""
                        />
                      </div>
                      <div className="flex justify-center align-item items-center ms-1 font-semibold text-xs">
                        <h1>intizamkz@gmail.com</h1>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
