import { Select } from "@mantine/core";
import FormCardService from "../../service/FormCardService";

interface IProps {
  pathNeeded?: boolean;
}
function DirectorySetup(props: IProps) {
  const { pathNeeded } = props;
  const { allPaths, pathDev, pathProj, handleSelectDev, handleSelectProj } =
    FormCardService();

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
        </>
      ) : (
        <></>
      )}
    </>
  );
}
export default DirectorySetup;
