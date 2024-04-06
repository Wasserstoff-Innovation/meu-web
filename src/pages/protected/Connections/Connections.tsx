import HomeLayout from "./Home"
import { ConnectionData } from './ConnectionsData'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface MyProps{
  isRequest : boolean
}

const Connections:React.FC<MyProps> = ({isRequest}) => {
  const Navigate = useNavigate()
  const [userConnections, setUserConnection] = useState(ConnectionData)

  const handleClose = (id:number) => {
    const tempArr = userConnections.filter((connection) => connection.id !== id)
    setUserConnection(tempArr)
  }

  const handleAccept = (id: number) => {
    console.log("Accept Function Called with the id : ",id)
  }

  return (
    <HomeLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between p-2 border-1 bg-[#313437] border-[#A3A5A6] rounded-md ">
          <div className="flex items-center gap-4">
            <div>
              <img
                src="./avatar.png"
                alt="avatar"
                className="size-[50px] rounded-full cursor-pointer"
                onClick={() => Navigate("/")}
              />
            </div>
            <div className="flex flex-col justify-center text-[12px]">
              <div>Invite contact on MEU</div>
              <div className="text-[10px]">meu.com/johndoe</div>
            </div>
          </div>
          <div className="px-2">
            <img
              src="./share.svg"
              alt="share"
              className="w-[18px] h-[20px] cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {userConnections.map((connection) => (
            <div key={connection.id} className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div>
                    <img
                      src="./avatar.png"
                      alt="avatar"
                      className="size-[50px] rounded-full cursor-pointer"
                      onClick={() => Navigate("/")}
                    />
                  </div>
                  <div className="flex flex-col justify-center text-[12px]">
                    <div>{connection.name}</div>
                    <div className="text-[10px]">{connection.username}</div>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  {isRequest && <div className="bg-[#1272BA] p-1 text-[10px] px-4   rounded-full cursor-pointer shadow-sm" onClick={()=>handleAccept(connection.id)}>Accept</div>}
                  <div
                    className="cursor-pointer"
                    onClick={() => handleClose(connection.id)}
                  >
                    <div className="">
                      <img src="./close.svg" alt="close" className="size-3" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center px-4 gap-4">
                <div>
                  <img
                    src="./icons/info.svg"
                    alt="info"
                    className="size-4 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="text-[10px]">
                    You both connected at {connection.connectedLocation} <br />{" "}
                    on {connection.connectedDate}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Connections