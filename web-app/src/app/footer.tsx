import Image from "next/image";
export default function Footer() {
  return (
    <>
      <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
        <div className="place-self-center pt-10 lg:place-self-end">
          <a href="https://github.com/ahmad-musleh/kibbo">
            <Image src="/kibbo.svg" width={250} height={250} alt="Kibbo logo" />
          </a>
        </div>
        <div className="m-4 h-full max-w-xl place-self-center p-4 text-center lg:m-10 lg:ml-4 lg:place-self-start lg:p-10 lg:pl-0 lg:text-left">
          <span className="text-lg text-gray-400">
            Kibbo streamlines your Docker workflow by eliminating the hassle of
            manual commands and file outputs. Easily log different services to
            separate files and access those logs just like browsing through
            regular files. Simplify logging, enhance productivity!
          </span>
        </div>
      </div>
      <div className="flex md:hidden">
        <div className="m-auto place-self-center">
          <Image
            src={"/github-mark-white.svg"}
            width={50}
            height={50}
            alt="Go to github project"
          />
        </div>
      </div>
    </>
  );
}
