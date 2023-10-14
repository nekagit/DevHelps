import { Flex } from "@mantine/core";

interface IProps {
  songDataDisplay: boolean;
  leftSide: string[];
  rightSide: string[];
}

function SongDataDisplay(props: IProps) {
    console.log("render")
  const { songDataDisplay, leftSide, rightSide } = props;
  
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
