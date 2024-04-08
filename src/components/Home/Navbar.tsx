// import { AuthClient, LocalStorage } from "@dfinity/auth-client";
// import { Ed25519KeyIdentity } from "@dfinity/identity";
import { Navbar, NavbarBrand } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  const checkSign = async () => {
    // const authClient = await AuthClient.create({
    //   storage: new LocalStorage(),
    //   keyType: "Ed25519",
    // });
    // // await authClient.login({
    // //   // 7 days in nanoseconds
    // //   maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
    // //   identityProvider: "https://identity.internetcomputer.org",
    // //   onSuccess: async () => {
    // //     console.log(authClient);
    // //   },
    // // });
    // const identity = authClient.getIdentity();
    // console.log("identity", identity, authClient);
    // const identity = Ed25519KeyIdentity.generate();
    // console.log("identity", identity);
    // const publicKey = identity.getPublicKey();
    // console.log("publicKey", publicKey);
    // const keyPair = identity.getKeyPair()
    // console.log("keyPair", keyPair);
    // const someData = "Hello World!";
    // const signature = await identity.sign(Buffer.from(someData));
    // console.log("signature", signature);
    // const isValid = Ed25519KeyIdentity.verify( signature ,  Buffer.from(someData), publicKey.toDer());
    // console.log("isValid", isValid);
  };

  return (
    <>
      <Navbar className="bg-[#11181C] ">
        <NavbarBrand>
          <div className=" size-10 ">
            <img src="./avatar.png" alt="avatar" className="rounded-full" />
          </div>
        </NavbarBrand>
        <div className="flex gap-8 ">
          <img
            src="./qr_code_scanner.svg"
            alt="qr-code"
            className="size-6 cursor-pointer"
            onClick={checkSign}
          />
          <img
            src="./tune.svg"
            alt="filter"
            className="cursor-pointer size-6"
            onClick={() => navigate("/tune-recommendation")}
          />
        </div>
      </Navbar>
    </>
  );
}
