import { Flex } from "@mantine/core";
import { useSpotifyService } from "../../service/SpotifyService";
import { useMemo } from "react";
import { SpotifyHelpers } from "../../helpers/SpotifyHelpers";

interface IProps {
  songDataDisplay: boolean;
}
function SongDataDisplay(props: IProps) {
  const { songDataDisplay } = props;
  const { currentSong } = useSpotifyService()
  const { leftSide, rightSide } = useMemo(() => {
    const { result, resultArray } =
      SpotifyHelpers().formatSongData(currentSong);
      console.log("current song ", currentSong)
    return {
      result,
      leftSide: resultArray
        .slice(0, resultArray.length / 2)
        .map((x) => x + "\n"),
      rightSide: resultArray
        .slice(resultArray.length / 2, resultArray.length - 1)
        .map((x) => x + "\n"),
    };
  }, [currentSong]);

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
