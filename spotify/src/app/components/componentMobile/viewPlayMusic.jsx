export default function ViewPageMobile() {
  return (
    <>
      <div className=" h-4/5 border border-orange-200">
        {/* search bar */}
        <div className="border flex p-4 ">
          <div className="w-1/2  border">
            <input
              // onChange={handleInput}
              placeholder="search"
              className="rounded-lg outline-none w-40 p-1 text-gray-950"
              type="text"
            />
          </div>
          <div className="flex justify-items-center border  w-1/2"></div>
        </div>
        {/* search bar */}

        <div className="mt-6 h-72 w-72 m-auto border border-red-400 ">
          <img
            className="rounded-lg"
            src="https://i.scdn.co/image/ab67616d0000b2735974be9bbf90d8f21af5515f"
            alt=""
          />
        </div>
        <div className="border"></div>
      </div>
    </>
  );
}
