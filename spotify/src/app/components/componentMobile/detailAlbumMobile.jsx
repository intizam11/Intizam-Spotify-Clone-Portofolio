import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/app/context/context";

export default function DetailAlbumMobile() {
  const [detailAlbuumData, setDetailAlbumData] = useState();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [state, dispatch] = useContext(UserContext);
  const [isHover, setIsHover] = useState();
  const getDetailAlbum = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/albums/${state.detailAlbum.detailValueIdAlbum}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      const data = await response.json();
      setDetailAlbumData(data.tracks.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailAlbum();
  }, []);
  return (
    <>
      {detailAlbuumData?.map((itemTrack, index) => (
        <div
          key={index}
          className=" h-16 w-full flex "
          onClick={() => {
            dispatch({
              type: "SETAUDIO_PLAYER",
              payload: {
                audioName: itemTrack.name,
                artisName: itemTrack.artists[0].name,
                // audioImage : item1.track.album.images[0].url,
                audioUrl: itemTrack.preview_url,
              },
            });
          }}
          onMouseEnter={() => setIsHover(index)}
          onMouseLeave={() => setIsHover(null)}
        >
          <div className=" flex w-full">
            {isHover === index ? (
              <div className="  w-14 flex justify-center align-item items-center cursor-pointer">
                <div className="bg-green-500 w-8 h-8  flex items-center justify-center rounded-full mx-auto">
                  <img className="w-5 h-5" src="/playbutton.jpg" alt="not" />
                </div>
              </div>
            ) : (
              <div className="  w-14 flex justify-center align-item items-center">
                <p className="text-white">{index + 1}</p>
              </div>
            )}
            <div className=" ms-2 ">
              <p className="text-sm font-bold text-white">{itemTrack.name}</p>
              <div className="m-2"></div>
              <p className="text-sm text-gray-300 font-medium">
                {itemTrack.artists[0].name}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
