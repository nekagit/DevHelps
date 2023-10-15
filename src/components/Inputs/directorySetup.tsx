import { Select } from "@mantine/core";

interface IProps {
  pathNeeded?: boolean;
  setPathDev: React.Dispatch<React.SetStateAction<string>>;
  setPathProj: React.Dispatch<React.SetStateAction<string>>;
  pathDev: string;
  pathProj: string;
  allPaths: string[];
}

function DirectorySetup(props: IProps) {
  console.log("render")
  const { pathNeeded, setPathDev, setPathProj, pathDev, pathProj, allPaths } = props;

  const handleSelectDev = (e: string | null) => {
    if (e != null) setPathDev(e);
  };
  const handleSelectProj = (e: string | null) => {
    if (e != null) setPathProj(e);
  };
  return (
    <>
      {pathNeeded != undefined && pathNeeded ? (
        <>
          <Select
            key={"pathDev"}
            label="path to my DevHelps"
            placeholder="Pick value"
            value={pathDev}
            onChange={(e: string | null) => handleSelectDev(e)}
            data={allPaths}
          />
          <Select
            key={"pathProj"}
            label="path your Project"
            placeholder="Pick value"
            value={pathProj}
            onChange={(e: string | null) => handleSelectProj(e)}
            data={allPaths}
          />
          <br />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
export default DirectorySetup;
