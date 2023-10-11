import { Badge, Flex } from "@mantine/core";
import { IBadge } from "../../interfaces/IBadge";
import { useSpotifyService } from "../../service/SpotifyService";
interface IProps {
  badges?: IBadge[];
}
function FormBadges(props: IProps) {
  const { badges } = props;
  const { accessToken } = useSpotifyService();
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
                accessToken != ""
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
