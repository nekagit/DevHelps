import { Flex } from "@mantine/core";

interface IProps {
  songDataDisplay: boolean;
  leftSide?: string[];
  rightSide?: string[]
  leftSideAlbum?: string[];
  rightSideAlbum?: string[];
}

function SongDataDisplay(props: IProps) {
  const { songDataDisplay, leftSide, rightSide, leftSideAlbum, rightSideAlbum } = props;
  console.log(leftSide, leftSideAlbum)
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
          <pre>{leftSideAlbum}</pre>
            <pre>{rightSideAlbum}</pre>
            <hr />
          
        </>
      ) : (
        <></>
      )}
    </>
  );
}
export default SongDataDisplay;
