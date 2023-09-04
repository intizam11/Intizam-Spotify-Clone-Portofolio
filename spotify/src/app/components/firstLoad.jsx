import Image from 'next/image';



export default function Openning() {
  return (
    <>
      <div className=" h-screen flex items-center">   
        <div className=" mx-auto ">
          <Image
            className="w-36 h-36 animate__animated  animate__bounce "
            src="/spo.png"
            alt=""
            width={144}
            height={144}
          />
          <h1 className="font-medium text-gray-500">Intizam | Fullstack</h1>
        
        </div>
      </div>
    </>
  );
}
