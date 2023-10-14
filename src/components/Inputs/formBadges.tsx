import { Badge, Flex } from "@mantine/core";
import { IBadge } from "../../interfaces/IBadge";
import { useSpotifyService } from "../../service/SpotifyService";
interface IProps {
  badges?: IBadge[];
  accessToken:string;
}
  console.log("render")
  function FormBadges(props: IProps) {
  const { badges, accessToken } = props;
  const setConditions = () =>{
    badges?.map(x => x.key == "accessToken" ? x.condition = accessToken.length > 1 : x)
  }
  console.log(accessToken)
  setConditions()
  return (
    <>
      <Flex
        gap="sm"
        justify="center"
        align="flex-end"
        direction="row"
        wrap="wrap"
      >
        {badges?.map((badge) => (
          <>
            <Badge
              key={badge.key}
              size="xl"
              variant="gradient"
              gradient={
                badge.condition
                  ? { from: "green", to: "green", deg: 90 }
                  : { from: "red", to: "red", deg: 90 }
              }
            >
              {badge.name}
            </Badge>
          </>
        ))}
      </Flex>
    </>
  );
}
export default FormBadges;
