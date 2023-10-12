import { Flex } from "@mantine/core";
import { useSpotifyService } from "../../service/SpotifyService";

interface IProps {
  songDataDisplay: boolean;
}
function SongDataDisplay(props: IProps) {
  const { songDataDisplay } = props;
  const { leftSide, rightSide } = useSpotifyService();
  console.log(leftSide, rightSide);
  return (
    <>
      {songDataDisplay ? (
        <>
          <br />
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
    </>
  );
}
export default SongDataDisplay;
