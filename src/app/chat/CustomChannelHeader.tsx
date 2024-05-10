import {
  ChannelHeader,
  ChannelHeaderProps,
  useChannelActionContext,
  useChannelStateContext,
} from "stream-chat-react";
import { UserResource } from "@clerk/types";
import { Bell, BellOff } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { error } from "console";

export default function CustomChannelHeader(props: ChannelHeaderProps) {
  const { user } = useUser();
  const {
    channel: { id: channelId },
  } = useChannelStateContext();
  return (
    <div className="flex items-center justify-between gap-3 bg-white dark:bg-[#17191c]">
      <ChannelHeader {...props} />
      {user && channelId && (
        <ChannelNotificationToggleButton channelId={channelId} user={user} />
      )}
    </div>
  );
}

interface ChannelNotificationToggleButtonProps {
  user: UserResource;
  channelId: string;
}

function ChannelNotificationToggleButton({
  user,
  channelId,
}: ChannelNotificationToggleButtonProps) {
  const { addNotification } = useChannelActionContext();
  const mutedChannels = user.unsafeMetadata.mutedChannels || [];

  const channelMuted = mutedChannels?.includes(channelId);

  async function setChannelMuted(channelId: string, muted: boolean) {
    try {
      
      let mutedChannelsUpdate: string[];

      if (muted) {
        mutedChannelsUpdate = [...mutedChannels, channelId];
      } else {
        mutedChannelsUpdate = mutedChannels.filter((id) => id !== channelId);
      }

      await user.update({
        unsafeMetadata: {
          mutedChannels: mutedChannelsUpdate,
        },
      });
      addNotification(
        `Channel notifications ${muted ? "muted" : "Unmuted"}`,
        "success"
      );
    } catch (error) {
      console.log(error);
      addNotification(`Something went wrong. Please try again`, "error");
    }
  }

  return (
    <div className="me-6">
      {!channelMuted ? (
        <span title="Mute channel notifications">
          <BellOff
            className="cursor-default"
            onClick={() => setChannelMuted(channelId, true)}
          />
        </span>
      ) : (
        <span title="Unmute channel notifications">
          <Bell
            className="cursor-pointer"
            onClick={() => setChannelMuted(channelId, false)}
          />
        </span>
      )}
    </div>
  );
}
