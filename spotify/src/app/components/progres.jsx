export default function Progres() {
  return (
    <div className="flex justify-center align-item items-center h-screen">
      <div className=" w-60 h-60 flex justify-center align-item items-center rounded-lg m-5 bg-neutral-800 drop-shadow-2xl">
        <div>
          <div className="m-3 ">
            <h1 className="text-2xl font-bold underline decoration-teal-400">
              Warning
            </h1>
          </div>
          <div className="m-3 ">
            <h1 className="text-xs font-bold  ">
              Mobile version is in progress for now only the desktop version is
              available, please open it on the desktop
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
