import * as React from "react";
import { useDisconnectButton } from "@livekit/components-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
/** @public */
export interface DisconnectButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  stopTracks?: boolean;
}

/**
 * The `DisconnectButton` is a basic html button with the added ability to disconnect from a LiveKit room.
 * Normally this is the big red button that allows end users to leave the video or audio call.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <DisconnectButton>Leave room</DisconnectButton>
 * </LiveKitRoom>
 * ```
 * @public
 */
export const DisconnectButton2: (
  props: DisconnectButtonProps & React.RefAttributes<HTMLButtonElement>
) => React.ReactNode = /* @__PURE__ */ React.forwardRef<
  HTMLButtonElement,
  DisconnectButtonProps
>(function DisconnectButton(props: DisconnectButtonProps, ref) {
  const { buttonProps } = useDisconnectButton(props);
  const isMobile = useIsMobile();
  return (
    <Button
      ref={ref}
      {...buttonProps}
      variant="destructive"
      className={`bg-red-600 hover:bg-red-700 text-white cursor-pointer disabled:cursor-not-allowed ${
        isMobile ? "px-3 py-2 text-xs" : "px-6 py-4 sm:!px-8 sm:!py-6"
      } rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      {props.children}
    </Button>
  );
});

{
  /* <Button variant="destructive" className="gap-2 w-44" onClick={onClick}>
      <span>{formatTime(callTime)}</span>
      <Phone className="h-4 w-4" />
      <span>End Call</span> */
}
