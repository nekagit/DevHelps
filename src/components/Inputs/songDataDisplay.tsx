import { Flex } from "@mantine/core";
import FormCardService from "../../service/FormCardService";

interface IProps {
  songDataDisplay: boolean;
}
function SongDataDisplay(props: IProps) {
  const { songDataDisplay } = props;
  const { leftSide, rightSide } = FormCardService();
  return (
    <>
      {songDataDisplay ? (
        <>
          <Flex
            gap="sm"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
            style={{ width: "88%" }}
            className="scrollbar-hidden-container"
          >
            <pre>{leftSide}</pre>
            <pre>{rightSide}</pre>
          </Flex>
          <hr />
        </>
      ) : (
        <></>
      )}
      <br />
    </>
  );
}
export default SongDataDisplay;
