/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import AgentChat from "./AgentChat";
import { useAgent } from "@/hooks/use-agent";
import UserChat from "./UserChat";
import { useEffect } from "react";
import { RootState } from "@/store/store";
import { AnalyticsState } from "@/store/services/analytics/types";
import { useAppSelector } from "@/store/store";

export default function ChatInterface() {
  // const { agentTranscriptions } = useVoiceAssistant();
  // const { userTranscriptions } = useUserVoiceAgent();
  // const [transcripts, setTranscripts] = useState<any[]>([]);
  const { transcription }: AnalyticsState = useAppSelector(
    (store: RootState) => {
      return store.AnalyticsSlice;
    }
  );

  // const transcription = [
  //   {
  //     segment: {
  //       id: "SG_4b86cc48026b",
  //       text: "Thanks for taking the time today. Let's start with something simple…. Tell me about yourself",
  //       startTime: 0,
  //       endTime: 0,
  //       final: true,
  //       language: "",
  //       firstReceivedTime: 1746170740485,
  //       lastReceivedTime: 1746170745292,
  //     },
  //     participant: {
  //       _events: {},
  //       _eventsCount: 14,
  //       _maxListeners: 100,
  //       audioLevel: 0,
  //       isSpeaking: false,
  //       _connectionQuality: "excellent",
  //       log: {
  //         name: "livekit-participant",
  //         levels: {
  //           TRACE: 0,
  //           DEBUG: 1,
  //           INFO: 2,
  //           WARN: 3,
  //           ERROR: 4,
  //           SILENT: 5,
  //         },
  //       },
  //       loggerOptions: {},
  //       sid: "PA_APGPK5ARmdA7",
  //       identity: "agent-AJ_ML2BeYmzmmwJ",
  //       name: "",
  //       metadata: "",
  //       audioTrackPublications: {},
  //       videoTrackPublications: {},
  //       trackPublications: {},
  //       _kind: 4,
  //       _attributes: {
  //         "lk.agent.state": "listening",
  //       },
  //       signalClient: {
  //         rtt: 41,
  //         state: 4,
  //         log: {
  //           name: "livekit-signal",
  //           levels: {
  //             TRACE: 0,
  //             DEBUG: 1,
  //             INFO: 2,
  //             WARN: 3,
  //             ERROR: 4,
  //             SILENT: 5,
  //           },
  //         },
  //         _requestId: 0,
  //         useJSON: false,
  //         requestQueue: {
  //           pendingTasks: {},
  //           taskMutex: {
  //             _locking: {},
  //             _locks: 0,
  //           },
  //           nextTaskIndex: 53,
  //         },
  //         queuedRequests: [],
  //         closingLock: {
  //           _locking: {},
  //           _locks: 0,
  //         },
  //         connectionLock: {
  //           _locking: {},
  //           _locks: 0,
  //         },
  //         options: {
  //           autoSubscribe: true,
  //           adaptiveStream: false,
  //           maxRetries: 1,
  //           e2eeEnabled: false,
  //           websocketTimeout: 15000,
  //         },
  //         connectOptions: {
  //           autoSubscribe: true,
  //           adaptiveStream: false,
  //           maxRetries: 1,
  //           e2eeEnabled: false,
  //           websocketTimeout: 15000,
  //         },
  //         pingTimeoutDuration: 15,
  //         pingIntervalDuration: 5,
  //         pingTimeout: 216,
  //         pingInterval: 56,
  //       },
  //       volumeMap: {},
  //       permissions: {
  //         canSubscribe: true,
  //         canPublish: true,
  //         canPublishData: true,
  //         hidden: false,
  //         recorder: false,
  //         canPublishSources: [],
  //         canUpdateMetadata: true,
  //         agent: true,
  //         canSubscribeMetrics: false,
  //       },
  //       participantInfo: {
  //         sid: "PA_APGPK5ARmdA7",
  //         identity: "agent-AJ_ML2BeYmzmmwJ",
  //         state: "ACTIVE",
  //         tracks: [
  //           {
  //             sid: "TR_AMPR86vzHQ8zN7",
  //             type: "AUDIO",
  //             name: "assistant_voice",
  //             muted: false,
  //             width: 0,
  //             height: 0,
  //             simulcast: false,
  //             disableDtx: false,
  //             source: "MICROPHONE",
  //             layers: [],
  //             mimeType: "audio/red",
  //             mid: "0",
  //             codecs: [],
  //             stereo: false,
  //             disableRed: false,
  //             encryption: "NONE",
  //             stream: "camera",
  //             version: {
  //               unixMicro: "1746170739417361",
  //               ticks: 0,
  //             },
  //             audioFeatures: [],
  //             backupCodecPolicy: "PREFER_REGRESSION",
  //           },
  //         ],
  //         metadata: "",
  //         joinedAt: "1746170731",
  //         name: "",
  //         version: 13,
  //         permission: {
  //           canSubscribe: true,
  //           canPublish: true,
  //           canPublishData: true,
  //           hidden: false,
  //           recorder: false,
  //           canPublishSources: [],
  //           canUpdateMetadata: true,
  //           agent: true,
  //           canSubscribeMetrics: false,
  //         },
  //         region: "omumbai1b",
  //         isPublisher: true,
  //         kind: "AGENT",
  //         attributes: {
  //           "lk.agent.state": "listening",
  //         },
  //         disconnectReason: "UNKNOWN_REASON",
  //         joinedAtMs: "1746170731958",
  //         kindDetails: [],
  //       },
  //       lastSpokeAt: "2025-05-02T07:26:41.716Z",
  //     },
  //     publication: {
  //       _events: {},
  //       _eventsCount: 9,
  //       _maxListeners: 100,
  //       metadataMuted: false,
  //       encryption: 0,
  //       log: {
  //         name: "livekit-track-publication",
  //         levels: {
  //           TRACE: 0,
  //           DEBUG: 1,
  //           INFO: 2,
  //           WARN: 3,
  //           ERROR: 4,
  //           SILENT: 5,
  //         },
  //       },
  //       kind: "audio",
  //       trackSid: "TR_AMPR86vzHQ8zN7",
  //       trackName: "assistant_voice",
  //       source: "microphone",
  //       allowed: true,
  //       disabled: false,
  //       currentVideoQuality: 2,
  //       subscribed: true,
  //       mimeType: "audio/red",
  //       trackInfo: {
  //         sid: "TR_AMPR86vzHQ8zN7",
  //         type: "AUDIO",
  //         name: "assistant_voice",
  //         muted: false,
  //         width: 0,
  //         height: 0,
  //         simulcast: false,
  //         disableDtx: false,
  //         source: "MICROPHONE",
  //         layers: [],
  //         mimeType: "audio/red",
  //         mid: "0",
  //         codecs: [],
  //         stereo: false,
  //         disableRed: false,
  //         encryption: "NONE",
  //         stream: "camera",
  //         version: {
  //           unixMicro: "1746170739417361",
  //           ticks: 0,
  //         },
  //         audioFeatures: [],
  //         backupCodecPolicy: "PREFER_REGRESSION",
  //       },
  //     },
  //   },
  //   {
  //     segment: {
  //       id: "SG_693e2d6cff2b",
  //       text: "My name is Andrejudillo, and I would like to know more about me.",
  //       startTime: 0,
  //       endTime: 0,
  //       final: true,
  //       language: "",
  //       firstReceivedTime: 1746170747321,
  //       lastReceivedTime: 1746170752281,
  //     },
  //     participant: {
  //       _events: {},
  //       _eventsCount: 0,
  //       _maxListeners: 100,
  //       audioLevel: 0,
  //       isSpeaking: false,
  //       _connectionQuality: "excellent",
  //       log: {
  //         name: "livekit-participant",
  //         levels: {
  //           TRACE: 0,
  //           DEBUG: 1,
  //           INFO: 2,
  //           WARN: 3,
  //           ERROR: 4,
  //           SILENT: 5,
  //         },
  //       },
  //       loggerOptions: {},
  //       sid: "PA_7wGNmEq8pYWz",
  //       identity: "voice_assistant_user_2702",
  //       name: "",
  //       metadata: '{"interviewId":"9cc9d552-06cd-43c1-a781-9e41e408c044"}',
  //       audioTrackPublications: {},
  //       videoTrackPublications: {},
  //       trackPublications: {},
  //       _kind: 0,
  //       _attributes: {
  //         level: "9cc9d552-06cd-43c1-a781-9e41e408c044",
  //         origin: "http://localhost:3000",
  //         type: "human",
  //         interviewId: "121317",
  //       },
  //       pendingPublishing: {},
  //       pendingPublishPromises: {},
  //       participantTrackPermissions: [],
  //       allParticipantsAllowedToSubscribe: true,
  //       encryptionType: 0,
  //       enabledPublishVideoCodecs: [
  //         {
  //           mime: "video/VP8",
  //           fmtpLine: "",
  //         },
  //         {
  //           mime: "video/H264",
  //           fmtpLine: "",
  //         },
  //         {
  //           mime: "video/VP9",
  //           fmtpLine: "",
  //         },
  //         {
  //           mime: "video/AV1",
  //           fmtpLine: "",
  //         },
  //         {
  //           mime: "video/H265",
  //           fmtpLine: "",
  //         },
  //       ],
  //       pendingAcks: {},
  //       pendingResponses: {},
  //       engine: {
  //         _events: {},
  //         _eventsCount: 0,
  //         options: {
  //           adaptiveStream: false,
  //           dynacast: false,
  //           stopLocalTrackOnUnpublish: true,
  //           reconnectPolicy: {
  //             _retryDelays: [
  //               0, 300, 1200, 2700, 4800, 7000, 7000, 7000, 7000, 7000,
  //             ],
  //           },
  //           disconnectOnPageLeave: true,
  //           webAudioMix: false,
  //           audioCaptureDefaults: {
  //             deviceId: {
  //               ideal: "default",
  //             },
  //             autoGainControl: true,
  //             echoCancellation: true,
  //             noiseSuppression: true,
  //             voiceIsolation: true,
  //           },
  //           videoCaptureDefaults: {
  //             deviceId: {
  //               ideal: "default",
  //             },
  //             resolution: {
  //               width: 1280,
  //               height: 720,
  //               frameRate: 30,
  //               aspectRatio: 1.7777777777777777,
  //             },
  //           },
  //           publishDefaults: {
  //             audioPreset: {
  //               maxBitrate: 48000,
  //             },
  //             dtx: true,
  //             red: true,
  //             forceStereo: false,
  //             simulcast: true,
  //             screenShareEncoding: {
  //               maxBitrate: 2500000,
  //               maxFramerate: 15,
  //               priority: "medium",
  //             },
  //             stopMicTrackOnMute: false,
  //             videoCodec: "vp8",
  //             backupCodec: true,
  //           },
  //         },
  //         rtcConfig: {},
  //         peerConnectionTimeout: 15000,
  //         fullReconnectOnNext: false,
  //         subscriberPrimary: true,
  //         pcState: 1,
  //         _isClosed: true,
  //         pendingTrackResolvers: {},
  //         reconnectAttempts: 0,
  //         reconnectStart: 0,
  //         attemptingReconnect: false,
  //         joinAttempts: 0,
  //         maxJoinAttempts: 1,
  //         shouldFailNext: false,
  //         log: {
  //           name: "livekit-engine",
  //           levels: {
  //             TRACE: 0,
  //             DEBUG: 1,
  //             INFO: 2,
  //             WARN: 3,
  //             ERROR: 4,
  //             SILENT: 5,
  //           },
  //         },
  //         loggerOptions: {},
  //         client: {
  //           rtt: 41,
  //           state: 4,
  //           log: {
  //             name: "livekit-signal",
  //             levels: {
  //               TRACE: 0,
  //               DEBUG: 1,
  //               INFO: 2,
  //               WARN: 3,
  //               ERROR: 4,
  //               SILENT: 5,
  //             },
  //           },
  //           _requestId: 0,
  //           useJSON: false,
  //           requestQueue: {
  //             pendingTasks: {},
  //             taskMutex: {
  //               _locking: {},
  //               _locks: 0,
  //             },
  //             nextTaskIndex: 53,
  //           },
  //           queuedRequests: [],
  //           closingLock: {
  //             _locking: {},
  //             _locks: 0,
  //           },
  //           connectionLock: {
  //             _locking: {},
  //             _locks: 0,
  //           },
  //           options: {
  //             autoSubscribe: true,
  //             adaptiveStream: false,
  //             maxRetries: 1,
  //             e2eeEnabled: false,
  //             websocketTimeout: 15000,
  //           },
  //           connectOptions: {
  //             autoSubscribe: true,
  //             adaptiveStream: false,
  //             maxRetries: 1,
  //             e2eeEnabled: false,
  //             websocketTimeout: 15000,
  //           },
  //           pingTimeoutDuration: 15,
  //           pingIntervalDuration: 5,
  //           pingTimeout: 216,
  //           pingInterval: 56,
  //         },
  //         reconnectPolicy: {
  //           _retryDelays: [
  //             0, 300, 1200, 2700, 4800, 7000, 7000, 7000, 7000, 7000,
  //           ],
  //         },
  //         closingLock: {
  //           _locking: {},
  //           _locks: 0,
  //         },
  //         dataProcessLock: {
  //           _locking: {},
  //           _locks: 0,
  //         },
  //         dcBufferStatus: {},
  //         regionUrlProvider: {
  //           lastUpdateAt: 1746170729835,
  //           settingsCacheTime: 3000,
  //           attemptedRegions: [],
  //           serverUrl: "wss://inprep-j9suz8mb.livekit.cloud/",
  //           token:
  //             "eyJhbGciOiJIUzI1NiJ9.eyJtZXRhZGF0YSI6IntcImludGVydmlld0lkXCI6XCI5Y2M5ZDU1Mi0wNmNkLTQzYzEtYTc4MS05ZTQxZTQwOGMwNDRcIn0iLCJhdHRyaWJ1dGVzIjp7ImxldmVsIjoiOWNjOWQ1NTItMDZjZC00M2MxLWE3ODEtOWU0MWU0MDhjMDQ0IiwidHlwZSI6Imh1bWFuIiwib3JpZ2luIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaW50ZXJ2aWV3SWQiOiIxMjEzMTcifSwidmlkZW8iOnsicm9vbSI6InZvaWNlX2Fzc2lzdGFudF9yb29tXzM0NDAiLCJyb29tSm9pbiI6dHJ1ZSwiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuUHVibGlzaERhdGEiOnRydWUsImNhblN1YnNjcmliZSI6dHJ1ZX0sImlzcyI6IkFQSWc5RnRHdVVYV2lYYiIsImV4cCI6MTc0NjE3MTYyOSwibmJmIjowLCJzdWIiOiJ2b2ljZV9hc3Npc3RhbnRfdXNlcl8yNzAyIn0.VAMRw8u3d8byvblzjZZpCV32axq8RtMoGQLcM8OR-Zw",
  //           regionSettings: {
  //             regions: [
  //               {
  //                 region: "omumbai1b",
  //                 url: "https://inprep-j9suz8mb.omumbai1b.production.livekit.cloud",
  //                 distance: "844705",
  //               },
  //               {
  //                 region: "odubai1a",
  //                 url: "https://inprep-j9suz8mb.odubai1a.production.livekit.cloud",
  //                 distance: "2704822",
  //               },
  //               {
  //                 region: "osingapore1a",
  //                 url: "https://inprep-j9suz8mb.osingapore1a.production.livekit.cloud",
  //                 distance: "3168189",
  //               },
  //             ],
  //           },
  //         },
  //         url: "wss://inprep-j9suz8mb.livekit.cloud",
  //         token:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdHRyaWJ1dGVzIjp7ImludGVydmlld0lkIjoiMTIxMzE3IiwibGV2ZWwiOiI5Y2M5ZDU1Mi0wNmNkLTQzYzEtYTc4MS05ZTQxZTQwOGMwNDQiLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJ0eXBlIjoiaHVtYW4ifSwiZXhwIjoxNzQ2MTcxMzMwLCJpc3MiOiJBUElnOUZ0R3VVWFdpWGIiLCJtZXRhZGF0YSI6IntcImludGVydmlld0lkXCI6XCI5Y2M5ZDU1Mi0wNmNkLTQzYzEtYTc4MS05ZTQxZTQwOGMwNDRcIn0iLCJuYmYiOjE3NDYxNzA3MzAsInN1YiI6InZvaWNlX2Fzc2lzdGFudF91c2VyXzI3MDIiLCJ2aWRlbyI6eyJjYW5QdWJsaXNoIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJyb29tIjoidm9pY2VfYXNzaXN0YW50X3Jvb21fMzQ0MCIsInJvb21Kb2luIjp0cnVlfX0.LX02HVYw8zM4Gs6cnyX6ZGo4QdebZlgqKfOX2jYD7pQ",
  //         signalOpts: {
  //           autoSubscribe: true,
  //           adaptiveStream: false,
  //           maxRetries: 1,
  //           e2eeEnabled: false,
  //           websocketTimeout: 15000,
  //         },
  //         latestJoinResponse: {
  //           room: {
  //             sid: "",
  //             name: "voice_assistant_room_3440",
  //             emptyTimeout: 300,
  //             maxParticipants: 0,
  //             creationTime: "1746170729",
  //             turnPassword: "",
  //             enabledCodecs: [
  //               {
  //                 mime: "video/H264",
  //                 fmtpLine: "",
  //               },
  //               {
  //                 mime: "video/VP8",
  //                 fmtpLine: "",
  //               },
  //               {
  //                 mime: "video/VP9",
  //                 fmtpLine: "",
  //               },
  //               {
  //                 mime: "video/AV1",
  //                 fmtpLine: "",
  //               },
  //               {
  //                 mime: "audio/red",
  //                 fmtpLine: "",
  //               },
  //               {
  //                 mime: "audio/opus",
  //                 fmtpLine: "",
  //               },
  //             ],
  //             metadata: "",
  //             numParticipants: 0,
  //             activeRecording: false,
  //             numPublishers: 0,
  //             version: {
  //               unixMicro: "943920000000000",
  //               ticks: 0,
  //             },
  //             departureTimeout: 20,
  //             creationTimeMs: "1746170729876",
  //           },
  //           participant: {
  //             sid: "PA_7wGNmEq8pYWz",
  //             identity: "voice_assistant_user_2702",
  //             state: "JOINING",
  //             tracks: [],
  //             metadata:
  //               '{"interviewId":"9cc9d552-06cd-43c1-a781-9e41e408c044"}',
  //             joinedAt: "1746170730",
  //             name: "",
  //             version: 0,
  //             permission: {
  //               canSubscribe: true,
  //               canPublish: true,
  //               canPublishData: true,
  //               hidden: false,
  //               recorder: false,
  //               canPublishSources: [],
  //               canUpdateMetadata: false,
  //               agent: false,
  //               canSubscribeMetrics: false,
  //             },
  //             region: "omumbai1b",
  //             isPublisher: false,
  //             kind: "STANDARD",
  //             attributes: {
  //               origin: "http://localhost:3000",
  //               type: "human",
  //               interviewId: "121317",
  //               level: "9cc9d552-06cd-43c1-a781-9e41e408c044",
  //             },
  //             disconnectReason: "UNKNOWN_REASON",
  //             joinedAtMs: "1746170730163",
  //             kindDetails: [],
  //           },
  //           otherParticipants: [],
  //           serverVersion: "1.8.4",
  //           iceServers: [
  //             {
  //               urls: [
  //                 "turn:ip-140-238-241-202.host.livekit.cloud:3478?transport=udp",
  //                 "turns:omumbai1b.turn.livekit.cloud:443?transport=tcp",
  //                 "turns:inprep-j9suz8mb.turn.livekit.cloud:443?transport=tcp",
  //               ],
  //               username: "6dVWwhTcF1mTHd3NfKIo4TMsS7KsqqujozocOLJoCC",
  //               credential: "DmtUSwoF4kibxcgHhWfBiiF84zBsbNi46RuSs7KeinQ",
  //             },
  //           ],
  //           subscriberPrimary: true,
  //           alternativeUrl: "",
  //           serverRegion: "India",
  //           pingTimeout: 15,
  //           pingInterval: 5,
  //           serverInfo: {
  //             edition: "Cloud",
  //             version: "1.8.4",
  //             protocol: 15,
  //             region: "India",
  //             nodeId: "NM_OMUMBAI1B_msiBq8iYRG6b",
  //             debugInfo: "",
  //             agentProtocol: 0,
  //           },
  //           sifTrailer: "gsa6/Lyuvt0=",
  //           enabledPublishCodecs: [
  //             {
  //               mime: "video/VP8",
  //               fmtpLine: "",
  //             },
  //             {
  //               mime: "video/H264",
  //               fmtpLine: "",
  //             },
  //             {
  //               mime: "video/VP9",
  //               fmtpLine: "",
  //             },
  //             {
  //               mime: "video/AV1",
  //               fmtpLine: "",
  //             },
  //             {
  //               mime: "video/H265",
  //               fmtpLine: "",
  //             },
  //             {
  //               mime: "audio/red",
  //               fmtpLine: "",
  //             },
  //             {
  //               mime: "audio/opus",
  //               fmtpLine: "",
  //             },
  //           ],
  //           fastPublish: true,
  //         },
  //         participantSid: "PA_7wGNmEq8pYWz",
  //       },
  //       roomOptions: {
  //         adaptiveStream: false,
  //         dynacast: false,
  //         stopLocalTrackOnUnpublish: true,
  //         reconnectPolicy: {
  //           _retryDelays: [
  //             0, 300, 1200, 2700, 4800, 7000, 7000, 7000, 7000, 7000,
  //           ],
  //         },
  //         disconnectOnPageLeave: true,
  //         webAudioMix: false,
  //         audioCaptureDefaults: {
  //           deviceId: {
  //             ideal: "default",
  //           },
  //           autoGainControl: true,
  //           echoCancellation: true,
  //           noiseSuppression: true,
  //           voiceIsolation: true,
  //         },
  //         videoCaptureDefaults: {
  //           deviceId: {
  //             ideal: "default",
  //           },
  //           resolution: {
  //             width: 1280,
  //             height: 720,
  //             frameRate: 30,
  //             aspectRatio: 1.7777777777777777,
  //           },
  //         },
  //         publishDefaults: {
  //           audioPreset: {
  //             maxBitrate: 48000,
  //           },
  //           dtx: true,
  //           red: true,
  //           forceStereo: false,
  //           simulcast: true,
  //           screenShareEncoding: {
  //             maxBitrate: 2500000,
  //             maxFramerate: 15,
  //             priority: "medium",
  //           },
  //           stopMicTrackOnMute: false,
  //           videoCodec: "vp8",
  //           backupCodec: true,
  //         },
  //       },
  //       activeDeviceMap: {},
  //       pendingSignalRequests: {},
  //       rpcHandlers: {},
  //       audioContext: {},
  //       permissions: {
  //         canSubscribe: true,
  //         canPublish: true,
  //         canPublishData: true,
  //         hidden: false,
  //         recorder: false,
  //         canPublishSources: [],
  //         canUpdateMetadata: false,
  //         agent: false,
  //         canSubscribeMetrics: false,
  //       },
  //       participantInfo: {
  //         sid: "PA_7wGNmEq8pYWz",
  //         identity: "voice_assistant_user_2702",
  //         state: "ACTIVE",
  //         tracks: [
  //           {
  //             sid: "TR_AM3LorUA5rg7tR",
  //             type: "AUDIO",
  //             name: "",
  //             muted: false,
  //             width: 0,
  //             height: 0,
  //             simulcast: false,
  //             disableDtx: false,
  //             source: "MICROPHONE",
  //             layers: [],
  //             mimeType: "audio/red",
  //             mid: "1",
  //             codecs: [],
  //             stereo: false,
  //             disableRed: false,
  //             encryption: "NONE",
  //             stream: "camera",
  //             version: {
  //               unixMicro: "1746170730610357",
  //               ticks: 0,
  //             },
  //             audioFeatures: [],
  //             backupCodecPolicy: "PREFER_REGRESSION",
  //           },
  //         ],
  //         metadata: '{"interviewId":"9cc9d552-06cd-43c1-a781-9e41e408c044"}',
  //         joinedAt: "1746170730",
  //         name: "",
  //         version: 4,
  //         permission: {
  //           canSubscribe: true,
  //           canPublish: true,
  //           canPublishData: true,
  //           hidden: false,
  //           recorder: false,
  //           canPublishSources: [],
  //           canUpdateMetadata: false,
  //           agent: false,
  //           canSubscribeMetrics: false,
  //         },
  //         region: "omumbai1b",
  //         isPublisher: true,
  //         kind: "STANDARD",
  //         attributes: {
  //           level: "9cc9d552-06cd-43c1-a781-9e41e408c044",
  //           origin: "http://localhost:3000",
  //           type: "human",
  //           interviewId: "121317",
  //         },
  //         disconnectReason: "UNKNOWN_REASON",
  //         joinedAtMs: "1746170730163",
  //         kindDetails: [],
  //       },
  //       lastSpokeAt: "2025-05-02T07:26:34.515Z",
  //     },
  //     publication: {
  //       _events: {},
  //       _eventsCount: 2,
  //       _maxListeners: 100,
  //       metadataMuted: false,
  //       encryption: 0,
  //       log: {
  //         name: "livekit-track-publication",
  //         levels: {
  //           TRACE: 0,
  //           DEBUG: 1,
  //           INFO: 2,
  //           WARN: 3,
  //           ERROR: 4,
  //           SILENT: 5,
  //         },
  //       },
  //       kind: "audio",
  //       trackSid: "TR_AM3LorUA5rg7tR",
  //       trackName: "",
  //       source: "microphone",
  //       mimeType: "",
  //       trackInfo: {
  //         sid: "TR_AM3LorUA5rg7tR",
  //         type: "AUDIO",
  //         name: "",
  //         muted: false,
  //         width: 0,
  //         height: 0,
  //         simulcast: false,
  //         disableDtx: false,
  //         source: "MICROPHONE",
  //         layers: [],
  //         mimeType: "",
  //         mid: "",
  //         codecs: [],
  //         stereo: false,
  //         disableRed: false,
  //         encryption: "NONE",
  //         stream: "camera",
  //         audioFeatures: [],
  //         backupCodecPolicy: "PREFER_REGRESSION",
  //       },
  //       options: {
  //         audioPreset: {
  //           maxBitrate: 48000,
  //         },
  //         dtx: true,
  //         red: true,
  //         forceStereo: false,
  //         simulcast: true,
  //         screenShareEncoding: {
  //           maxBitrate: 2500000,
  //           maxFramerate: 15,
  //           priority: "medium",
  //         },
  //         stopMicTrackOnMute: false,
  //         videoCodec: "vp8",
  //         backupCodec: true,
  //       },
  //     },
  //   },
  //   {
  //     segment: {
  //       id: "SG_5b8643c9bd35",
  //       text: "Hello, Demtri Jacob. Thank you for joining us today. We have a series of predefined questions that we'd like to discuss with you to better understand your experience and skills as they relate to the role we're considering. Let's go ahead and start with the first question. Can you describe a specific instance where you implemented an automated testing framework and how it impacted the project's efficiency?",
  //       startTime: 0,
  //       endTime: 0,
  //       final: true,
  //       language: "",
  //       firstReceivedTime: 1746170754943,
  //       lastReceivedTime: 1746170776546,
  //     },
  //     participant: {
  //       _events: {},
  //       _eventsCount: 14,
  //       _maxListeners: 100,
  //       audioLevel: 0,
  //       isSpeaking: false,
  //       _connectionQuality: "excellent",
  //       log: {
  //         name: "livekit-participant",
  //         levels: {
  //           TRACE: 0,
  //           DEBUG: 1,
  //           INFO: 2,
  //           WARN: 3,
  //           ERROR: 4,
  //           SILENT: 5,
  //         },
  //       },
  //       loggerOptions: {},
  //       sid: "PA_APGPK5ARmdA7",
  //       identity: "agent-AJ_ML2BeYmzmmwJ",
  //       name: "",
  //       metadata: "",
  //       audioTrackPublications: {},
  //       videoTrackPublications: {},
  //       trackPublications: {},
  //       _kind: 4,
  //       _attributes: {
  //         "lk.agent.state": "listening",
  //       },
  //       signalClient: {
  //         rtt: 41,
  //         state: 4,
  //         log: {
  //           name: "livekit-signal",
  //           levels: {
  //             TRACE: 0,
  //             DEBUG: 1,
  //             INFO: 2,
  //             WARN: 3,
  //             ERROR: 4,
  //             SILENT: 5,
  //           },
  //         },
  //         _requestId: 0,
  //         useJSON: false,
  //         requestQueue: {
  //           pendingTasks: {},
  //           taskMutex: {
  //             _locking: {},
  //             _locks: 0,
  //           },
  //           nextTaskIndex: 53,
  //         },
  //         queuedRequests: [],
  //         closingLock: {
  //           _locking: {},
  //           _locks: 0,
  //         },
  //         connectionLock: {
  //           _locking: {},
  //           _locks: 0,
  //         },
  //         options: {
  //           autoSubscribe: true,
  //           adaptiveStream: false,
  //           maxRetries: 1,
  //           e2eeEnabled: false,
  //           websocketTimeout: 15000,
  //         },
  //         connectOptions: {
  //           autoSubscribe: true,
  //           adaptiveStream: false,
  //           maxRetries: 1,
  //           e2eeEnabled: false,
  //           websocketTimeout: 15000,
  //         },
  //         pingTimeoutDuration: 15,
  //         pingIntervalDuration: 5,
  //         pingTimeout: 216,
  //         pingInterval: 56,
  //       },
  //       volumeMap: {},
  //       permissions: {
  //         canSubscribe: true,
  //         canPublish: true,
  //         canPublishData: true,
  //         hidden: false,
  //         recorder: false,
  //         canPublishSources: [],
  //         canUpdateMetadata: true,
  //         agent: true,
  //         canSubscribeMetrics: false,
  //       },
  //       participantInfo: {
  //         sid: "PA_APGPK5ARmdA7",
  //         identity: "agent-AJ_ML2BeYmzmmwJ",
  //         state: "ACTIVE",
  //         tracks: [
  //           {
  //             sid: "TR_AMPR86vzHQ8zN7",
  //             type: "AUDIO",
  //             name: "assistant_voice",
  //             muted: false,
  //             width: 0,
  //             height: 0,
  //             simulcast: false,
  //             disableDtx: false,
  //             source: "MICROPHONE",
  //             layers: [],
  //             mimeType: "audio/red",
  //             mid: "0",
  //             codecs: [],
  //             stereo: false,
  //             disableRed: false,
  //             encryption: "NONE",
  //             stream: "camera",
  //             version: {
  //               unixMicro: "1746170739417361",
  //               ticks: 0,
  //             },
  //             audioFeatures: [],
  //             backupCodecPolicy: "PREFER_REGRESSION",
  //           },
  //         ],
  //         metadata: "",
  //         joinedAt: "1746170731",
  //         name: "",
  //         version: 13,
  //         permission: {
  //           canSubscribe: true,
  //           canPublish: true,
  //           canPublishData: true,
  //           hidden: false,
  //           recorder: false,
  //           canPublishSources: [],
  //           canUpdateMetadata: true,
  //           agent: true,
  //           canSubscribeMetrics: false,
  //         },
  //         region: "omumbai1b",
  //         isPublisher: true,
  //         kind: "AGENT",
  //         attributes: {
  //           "lk.agent.state": "listening",
  //         },
  //         disconnectReason: "UNKNOWN_REASON",
  //         joinedAtMs: "1746170731958",
  //         kindDetails: [],
  //       },
  //       lastSpokeAt: "2025-05-02T07:26:41.716Z",
  //     },
  //     publication: {
  //       _events: {},
  //       _eventsCount: 9,
  //       _maxListeners: 100,
  //       metadataMuted: false,
  //       encryption: 0,
  //       log: {
  //         name: "livekit-track-publication",
  //         levels: {
  //           TRACE: 0,
  //           DEBUG: 1,
  //           INFO: 2,
  //           WARN: 3,
  //           ERROR: 4,
  //           SILENT: 5,
  //         },
  //       },
  //       kind: "audio",
  //       trackSid: "TR_AMPR86vzHQ8zN7",
  //       trackName: "assistant_voice",
  //       source: "microphone",
  //       allowed: true,
  //       disabled: false,
  //       currentVideoQuality: 2,
  //       subscribed: true,
  //       mimeType: "audio/red",
  //       trackInfo: {
  //         sid: "TR_AMPR86vzHQ8zN7",
  //         type: "AUDIO",
  //         name: "assistant_voice",
  //         muted: false,
  //         width: 0,
  //         height: 0,
  //         simulcast: false,
  //         disableDtx: false,
  //         source: "MICROPHONE",
  //         layers: [],
  //         mimeType: "audio/red",
  //         mid: "0",
  //         codecs: [],
  //         stereo: false,
  //         disableRed: false,
  //         encryption: "NONE",
  //         stream: "camera",
  //         version: {
  //           unixMicro: "1746170739417361",
  //           ticks: 0,
  //         },
  //         audioFeatures: [],
  //         backupCodecPolicy: "PREFER_REGRESSION",
  //       },
  //     },
  //   },
  //   {
  //     segment: {
  //       id: "SG_6ccf23cc9fda",
  //       text: "Yeah. Sure. Like, things are getting tough, and I was able to do a lot of things. But at the end of the day, you know, I always succeed",
  //       startTime: 0,
  //       endTime: 0,
  //       final: true,
  //       language: "",
  //       firstReceivedTime: 1746170780797,
  //       lastReceivedTime: 1746170788359,
  //     },
  //     participant: {
  //       _events: {},
  //       _eventsCount: 0,
  //       _maxListeners: 100,
  //       audioLevel: 0,
  //       isSpeaking: false,
  //       _connectionQuality: "excellent",
  //       log: {
  //         name: "livekit-participant",
  //         levels: {
  //           TRACE: 0,
  //           DEBUG: 1,
  //           INFO: 2,
  //           WARN: 3,
  //           ERROR: 4,
  //           SILENT: 5,
  //         },
  //       },
  //       loggerOptions: {},
  //       sid: "PA_7wGNmEq8pYWz",
  //       identity: "voice_assistant_user_2702",
  //       name: "",
  //       metadata: '{"interviewId":"9cc9d552-06cd-43c1-a781-9e41e408c044"}',
  //       audioTrackPublications: {},
  //       videoTrackPublications: {},
  //       trackPublications: {},
  //       _kind: 0,
  //       _attributes: {
  //         level: "9cc9d552-06cd-43c1-a781-9e41e408c044",
  //         origin: "http://localhost:3000",
  //         type: "human",
  //         interviewId: "121317",
  //       },
  //       pendingPublishing: {},
  //       pendingPublishPromises: {},
  //       participantTrackPermissions: [],
  //       allParticipantsAllowedToSubscribe: true,
  //       encryptionType: 0,
  //       enabledPublishVideoCodecs: [
  //         {
  //           mime: "video/VP8",
  //           fmtpLine: "",
  //         },
  //         {
  //           mime: "video/H264",
  //           fmtpLine: "",
  //         },
  //         {
  //           mime: "video/VP9",
  //           fmtpLine: "",
  //         },
  //         {
  //           mime: "video/AV1",
  //           fmtpLine: "",
  //         },
  //         {
  //           mime: "video/H265",
  //           fmtpLine: "",
  //         },
  //       ],
  //       pendingAcks: {},
  //       pendingResponses: {},
  //       engine: {
  //         _events: {},
  //         _eventsCount: 0,
  //         options: {
  //           adaptiveStream: false,
  //           dynacast: false,
  //           stopLocalTrackOnUnpublish: true,
  //           reconnectPolicy: {
  //             _retryDelays: [
  //               0, 300, 1200, 2700, 4800, 7000, 7000, 7000, 7000, 7000,
  //             ],
  //           },
  //           disconnectOnPageLeave: true,
  //           webAudioMix: false,
  //           audioCaptureDefaults: {
  //             deviceId: {
  //               ideal: "default",
  //             },
  //             autoGainControl: true,
  //             echoCancellation: true,
  //             noiseSuppression: true,
  //             voiceIsolation: true,
  //           },
  //           videoCaptureDefaults: {
  //             deviceId: {
  //               ideal: "default",
  //             },
  //             resolution: {
  //               width: 1280,
  //               height: 720,
  //               frameRate: 30,
  //               aspectRatio: 1.7777777777777777,
  //             },
  //           },
  //           publishDefaults: {
  //             audioPreset: {
  //               maxBitrate: 48000,
  //             },
  //             dtx: true,
  //             red: true,
  //             forceStereo: false,
  //             simulcast: true,
  //             screenShareEncoding: {
  //               maxBitrate: 2500000,
  //               maxFramerate: 15,
  //               priority: "medium",
  //             },
  //             stopMicTrackOnMute: false,
  //             videoCodec: "vp8",
  //             backupCodec: true,
  //           },
  //         },
  //         rtcConfig: {},
  //         peerConnectionTimeout: 15000,
  //         fullReconnectOnNext: false,
  //         subscriberPrimary: true,
  //         pcState: 1,
  //         _isClosed: true,
  //         pendingTrackResolvers: {},
  //         reconnectAttempts: 0,
  //         reconnectStart: 0,
  //         attemptingReconnect: false,
  //         joinAttempts: 0,
  //         maxJoinAttempts: 1,
  //         shouldFailNext: false,
  //         log: {
  //           name: "livekit-engine",
  //           levels: {
  //             TRACE: 0,
  //             DEBUG: 1,
  //             INFO: 2,
  //             WARN: 3,
  //             ERROR: 4,
  //             SILENT: 5,
  //           },
  //         },
  //         loggerOptions: {},
  //         client: {
  //           rtt: 41,
  //           state: 4,
  //           log: {
  //             name: "livekit-signal",
  //             levels: {
  //               TRACE: 0,
  //               DEBUG: 1,
  //               INFO: 2,
  //               WARN: 3,
  //               ERROR: 4,
  //               SILENT: 5,
  //             },
  //           },
  //           _requestId: 0,
  //           useJSON: false,
  //           requestQueue: {
  //             pendingTasks: {},
  //             taskMutex: {
  //               _locking: {},
  //               _locks: 0,
  //             },
  //             nextTaskIndex: 53,
  //           },
  //           queuedRequests: [],
  //           closingLock: {
  //             _locking: {},
  //             _locks: 0,
  //           },
  //           connectionLock: {
  //             _locking: {},
  //             _locks: 0,
  //           },
  //           options: {
  //             autoSubscribe: true,
  //             adaptiveStream: false,
  //             maxRetries: 1,
  //             e2eeEnabled: false,
  //             websocketTimeout: 15000,
  //           },
  //           connectOptions: {
  //             autoSubscribe: true,
  //             adaptiveStream: false,
  //             maxRetries: 1,
  //             e2eeEnabled: false,
  //             websocketTimeout: 15000,
  //           },
  //           pingTimeoutDuration: 15,
  //           pingIntervalDuration: 5,
  //           pingTimeout: 216,
  //           pingInterval: 56,
  //         },
  //         reconnectPolicy: {
  //           _retryDelays: [
  //             0, 300, 1200, 2700, 4800, 7000, 7000, 7000, 7000, 7000,
  //           ],
  //         },
  //         closingLock: {
  //           _locking: {},
  //           _locks: 0,
  //         },
  //         dataProcessLock: {
  //           _locking: {},
  //           _locks: 0,
  //         },
  //         dcBufferStatus: {},
  //         regionUrlProvider: {
  //           lastUpdateAt: 1746170729835,
  //           settingsCacheTime: 3000,
  //           attemptedRegions: [],
  //           serverUrl: "wss://inprep-j9suz8mb.livekit.cloud/",
  //           token:
  //             "eyJhbGciOiJIUzI1NiJ9.eyJtZXRhZGF0YSI6IntcImludGVydmlld0lkXCI6XCI5Y2M5ZDU1Mi0wNmNkLTQzYzEtYTc4MS05ZTQxZTQwOGMwNDRcIn0iLCJhdHRyaWJ1dGVzIjp7ImxldmVsIjoiOWNjOWQ1NTItMDZjZC00M2MxLWE3ODEtOWU0MWU0MDhjMDQ0IiwidHlwZSI6Imh1bWFuIiwib3JpZ2luIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaW50ZXJ2aWV3SWQiOiIxMjEzMTcifSwidmlkZW8iOnsicm9vbSI6InZvaWNlX2Fzc2lzdGFudF9yb29tXzM0NDAiLCJyb29tSm9pbiI6dHJ1ZSwiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuUHVibGlzaERhdGEiOnRydWUsImNhblN1YnNjcmliZSI6dHJ1ZX0sImlzcyI6IkFQSWc5RnRHdVVYV2lYYiIsImV4cCI6MTc0NjE3MTYyOSwibmJmIjowLCJzdWIiOiJ2b2ljZV9hc3Npc3RhbnRfdXNlcl8yNzAyIn0.VAMRw8u3d8byvblzjZZpCV32axq8RtMoGQLcM8OR-Zw",
  //           regionSettings: {
  //             regions: [
  //               {
  //                 region: "omumbai1b",
  //                 url: "https://inprep-j9suz8mb.omumbai1b.production.livekit.cloud",
  //                 distance: "844705",
  //               },
  //               {
  //                 region: "odubai1a",
  //                 url: "https://inprep-j9suz8mb.odubai1a.production.livekit.cloud",
  //                 distance: "2704822",
  //               },
  //               {
  //                 region: "osingapore1a",
  //                 url: "https://inprep-j9suz8mb.osingapore1a.production.livekit.cloud",
  //                 distance: "3168189",
  //               },
  //             ],
  //           },
  //         },
  //         url: "wss://inprep-j9suz8mb.livekit.cloud",
  //         token:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdHRyaWJ1dGVzIjp7ImludGVydmlld0lkIjoiMTIxMzE3IiwibGV2ZWwiOiI5Y2M5ZDU1Mi0wNmNkLTQzYzEtYTc4MS05ZTQxZTQwOGMwNDQiLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJ0eXBlIjoiaHVtYW4ifSwiZXhwIjoxNzQ2MTcxMzMwLCJpc3MiOiJBUElnOUZ0R3VVWFdpWGIiLCJtZXRhZGF0YSI6IntcImludGVydmlld0lkXCI6XCI5Y2M5ZDU1Mi0wNmNkLTQzYzEtYTc4MS05ZTQxZTQwOGMwNDRcIn0iLCJuYmYiOjE3NDYxNzA3MzAsInN1YiI6InZvaWNlX2Fzc2lzdGFudF91c2VyXzI3MDIiLCJ2aWRlbyI6eyJjYW5QdWJsaXNoIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJyb29tIjoidm9pY2VfYXNzaXN0YW50X3Jvb21fMzQ0MCIsInJvb21Kb2luIjp0cnVlfX0.LX02HVYw8zM4Gs6cnyX6ZGo4QdebZlgqKfOX2jYD7pQ",
  //         signalOpts: {
  //           autoSubscribe: true,
  //           adaptiveStream: false,
  //           maxRetries: 1,
  //           e2eeEnabled: false,
  //           websocketTimeout: 15000,
  //         },
  //         latestJoinResponse: {
  //           room: {
  //             sid: "",
  //             name: "voice_assistant_room_3440",
  //             emptyTimeout: 300,
  //             maxParticipants: 0,
  //             creationTime: "1746170729",
  //             turnPassword: "",
  //             enabledCodecs: [
  //               {
  //                 mime: "video/H264",
  //                 fmtpLine: "",
  //               },
  //               {
  //                 mime: "video/VP8",
  //                 fmtpLine: "",
  //               },
  //               {
  //                 mime: "video/VP9",
  //                 fmtpLine: "",
  //               },
  //               {
  //                 mime: "video/AV1",
  //                 fmtpLine: "",
  //               },
  //               {
  //                 mime: "audio/red",
  //                 fmtpLine: "",
  //               },
  //               {
  //                 mime: "audio/opus",
  //                 fmtpLine: "",
  //               },
  //             ],
  //             metadata: "",
  //             numParticipants: 0,
  //             activeRecording: false,
  //             numPublishers: 0,
  //             version: {
  //               unixMicro: "943920000000000",
  //               ticks: 0,
  //             },
  //             departureTimeout: 20,
  //             creationTimeMs: "1746170729876",
  //           },
  //           participant: {
  //             sid: "PA_7wGNmEq8pYWz",
  //             identity: "voice_assistant_user_2702",
  //             state: "JOINING",
  //             tracks: [],
  //             metadata:
  //               '{"interviewId":"9cc9d552-06cd-43c1-a781-9e41e408c044"}',
  //             joinedAt: "1746170730",
  //             name: "",
  //             version: 0,
  //             permission: {
  //               canSubscribe: true,
  //               canPublish: true,
  //               canPublishData: true,
  //               hidden: false,
  //               recorder: false,
  //               canPublishSources: [],
  //               canUpdateMetadata: false,
  //               agent: false,
  //               canSubscribeMetrics: false,
  //             },
  //             region: "omumbai1b",
  //             isPublisher: false,
  //             kind: "STANDARD",
  //             attributes: {
  //               origin: "http://localhost:3000",
  //               type: "human",
  //               interviewId: "121317",
  //               level: "9cc9d552-06cd-43c1-a781-9e41e408c044",
  //             },
  //             disconnectReason: "UNKNOWN_REASON",
  //             joinedAtMs: "1746170730163",
  //             kindDetails: [],
  //           },
  //           otherParticipants: [],
  //           serverVersion: "1.8.4",
  //           iceServers: [
  //             {
  //               urls: [
  //                 "turn:ip-140-238-241-202.host.livekit.cloud:3478?transport=udp",
  //                 "turns:omumbai1b.turn.livekit.cloud:443?transport=tcp",
  //                 "turns:inprep-j9suz8mb.turn.livekit.cloud:443?transport=tcp",
  //               ],
  //               username: "6dVWwhTcF1mTHd3NfKIo4TMsS7KsqqujozocOLJoCC",
  //               credential: "DmtUSwoF4kibxcgHhWfBiiF84zBsbNi46RuSs7KeinQ",
  //             },
  //           ],
  //           subscriberPrimary: true,
  //           alternativeUrl: "",
  //           serverRegion: "India",
  //           pingTimeout: 15,
  //           pingInterval: 5,
  //           serverInfo: {
  //             edition: "Cloud",
  //             version: "1.8.4",
  //             protocol: 15,
  //             region: "India",
  //             nodeId: "NM_OMUMBAI1B_msiBq8iYRG6b",
  //             debugInfo: "",
  //             agentProtocol: 0,
  //           },
  //           sifTrailer: "gsa6/Lyuvt0=",
  //           enabledPublishCodecs: [
  //             {
  //               mime: "video/VP8",
  //               fmtpLine: "",
  //             },
  //             {
  //               mime: "video/H264",
  //               fmtpLine: "",
  //             },
  //             {
  //               mime: "video/VP9",
  //               fmtpLine: "",
  //             },
  //             {
  //               mime: "video/AV1",
  //               fmtpLine: "",
  //             },
  //             {
  //               mime: "video/H265",
  //               fmtpLine: "",
  //             },
  //             {
  //               mime: "audio/red",
  //               fmtpLine: "",
  //             },
  //             {
  //               mime: "audio/opus",
  //               fmtpLine: "",
  //             },
  //           ],
  //           fastPublish: true,
  //         },
  //         participantSid: "PA_7wGNmEq8pYWz",
  //       },
  //       roomOptions: {
  //         adaptiveStream: false,
  //         dynacast: false,
  //         stopLocalTrackOnUnpublish: true,
  //         reconnectPolicy: {
  //           _retryDelays: [
  //             0, 300, 1200, 2700, 4800, 7000, 7000, 7000, 7000, 7000,
  //           ],
  //         },
  //         disconnectOnPageLeave: true,
  //         webAudioMix: false,
  //         audioCaptureDefaults: {
  //           deviceId: {
  //             ideal: "default",
  //           },
  //           autoGainControl: true,
  //           echoCancellation: true,
  //           noiseSuppression: true,
  //           voiceIsolation: true,
  //         },
  //         videoCaptureDefaults: {
  //           deviceId: {
  //             ideal: "default",
  //           },
  //           resolution: {
  //             width: 1280,
  //             height: 720,
  //             frameRate: 30,
  //             aspectRatio: 1.7777777777777777,
  //           },
  //         },
  //         publishDefaults: {
  //           audioPreset: {
  //             maxBitrate: 48000,
  //           },
  //           dtx: true,
  //           red: true,
  //           forceStereo: false,
  //           simulcast: true,
  //           screenShareEncoding: {
  //             maxBitrate: 2500000,
  //             maxFramerate: 15,
  //             priority: "medium",
  //           },
  //           stopMicTrackOnMute: false,
  //           videoCodec: "vp8",
  //           backupCodec: true,
  //         },
  //       },
  //       activeDeviceMap: {},
  //       pendingSignalRequests: {},
  //       rpcHandlers: {},
  //       audioContext: {},
  //       permissions: {
  //         canSubscribe: true,
  //         canPublish: true,
  //         canPublishData: true,
  //         hidden: false,
  //         recorder: false,
  //         canPublishSources: [],
  //         canUpdateMetadata: false,
  //         agent: false,
  //         canSubscribeMetrics: false,
  //       },
  //       participantInfo: {
  //         sid: "PA_7wGNmEq8pYWz",
  //         identity: "voice_assistant_user_2702",
  //         state: "ACTIVE",
  //         tracks: [
  //           {
  //             sid: "TR_AM3LorUA5rg7tR",
  //             type: "AUDIO",
  //             name: "",
  //             muted: false,
  //             width: 0,
  //             height: 0,
  //             simulcast: false,
  //             disableDtx: false,
  //             source: "MICROPHONE",
  //             layers: [],
  //             mimeType: "audio/red",
  //             mid: "1",
  //             codecs: [],
  //             stereo: false,
  //             disableRed: false,
  //             encryption: "NONE",
  //             stream: "camera",
  //             version: {
  //               unixMicro: "1746170730610357",
  //               ticks: 0,
  //             },
  //             audioFeatures: [],
  //             backupCodecPolicy: "PREFER_REGRESSION",
  //           },
  //         ],
  //         metadata: '{"interviewId":"9cc9d552-06cd-43c1-a781-9e41e408c044"}',
  //         joinedAt: "1746170730",
  //         name: "",
  //         version: 4,
  //         permission: {
  //           canSubscribe: true,
  //           canPublish: true,
  //           canPublishData: true,
  //           hidden: false,
  //           recorder: false,
  //           canPublishSources: [],
  //           canUpdateMetadata: false,
  //           agent: false,
  //           canSubscribeMetrics: false,
  //         },
  //         region: "omumbai1b",
  //         isPublisher: true,
  //         kind: "STANDARD",
  //         attributes: {
  //           level: "9cc9d552-06cd-43c1-a781-9e41e408c044",
  //           origin: "http://localhost:3000",
  //           type: "human",
  //           interviewId: "121317",
  //         },
  //         disconnectReason: "UNKNOWN_REASON",
  //         joinedAtMs: "1746170730163",
  //         kindDetails: [],
  //       },
  //       lastSpokeAt: "2025-05-02T07:26:34.515Z",
  //     },
  //     publication: {
  //       _events: {},
  //       _eventsCount: 2,
  //       _maxListeners: 100,
  //       metadataMuted: false,
  //       encryption: 0,
  //       log: {
  //         name: "livekit-track-publication",
  //         levels: {
  //           TRACE: 0,
  //           DEBUG: 1,
  //           INFO: 2,
  //           WARN: 3,
  //           ERROR: 4,
  //           SILENT: 5,
  //         },
  //       },
  //       kind: "audio",
  //       trackSid: "TR_AM3LorUA5rg7tR",
  //       trackName: "",
  //       source: "microphone",
  //       mimeType: "",
  //       trackInfo: {
  //         sid: "TR_AM3LorUA5rg7tR",
  //         type: "AUDIO",
  //         name: "",
  //         muted: false,
  //         width: 0,
  //         height: 0,
  //         simulcast: false,
  //         disableDtx: false,
  //         source: "MICROPHONE",
  //         layers: [],
  //         mimeType: "",
  //         mid: "",
  //         codecs: [],
  //         stereo: false,
  //         disableRed: false,
  //         encryption: "NONE",
  //         stream: "camera",
  //         audioFeatures: [],
  //         backupCodecPolicy: "PREFER_REGRESSION",
  //       },
  //       options: {
  //         audioPreset: {
  //           maxBitrate: 48000,
  //         },
  //         dtx: true,
  //         red: true,
  //         forceStereo: false,
  //         simulcast: true,
  //         screenShareEncoding: {
  //           maxBitrate: 2500000,
  //           maxFramerate: 15,
  //           priority: "medium",
  //         },
  //         stopMicTrackOnMute: false,
  //         videoCodec: "vp8",
  //         backupCodec: true,
  //       },
  //     },
  //   },
  //   {
  //     segment: {
  //       id: "SG_834b81a9fed5",
  //       text: "Could you provide more details about the specific instance where you implemented an automated testing framework? For example, how did it enhance the efficiency of the project?",
  //       startTime: 0,
  //       endTime: 0,
  //       final: true,
  //       language: "",
  //       firstReceivedTime: 1746170795314,
  //       lastReceivedTime: 1746170804291,
  //     },
  //     participant: {
  //       _events: {},
  //       _eventsCount: 14,
  //       _maxListeners: 100,
  //       audioLevel: 0,
  //       isSpeaking: false,
  //       _connectionQuality: "excellent",
  //       log: {
  //         name: "livekit-participant",
  //         levels: {
  //           TRACE: 0,
  //           DEBUG: 1,
  //           INFO: 2,
  //           WARN: 3,
  //           ERROR: 4,
  //           SILENT: 5,
  //         },
  //       },
  //       loggerOptions: {},
  //       sid: "PA_APGPK5ARmdA7",
  //       identity: "agent-AJ_ML2BeYmzmmwJ",
  //       name: "",
  //       metadata: "",
  //       audioTrackPublications: {},
  //       videoTrackPublications: {},
  //       trackPublications: {},
  //       _kind: 4,
  //       _attributes: {
  //         "lk.agent.state": "listening",
  //       },
  //       signalClient: {
  //         rtt: 41,
  //         state: 4,
  //         log: {
  //           name: "livekit-signal",
  //           levels: {
  //             TRACE: 0,
  //             DEBUG: 1,
  //             INFO: 2,
  //             WARN: 3,
  //             ERROR: 4,
  //             SILENT: 5,
  //           },
  //         },
  //         _requestId: 0,
  //         useJSON: false,
  //         requestQueue: {
  //           pendingTasks: {},
  //           taskMutex: {
  //             _locking: {},
  //             _locks: 0,
  //           },
  //           nextTaskIndex: 53,
  //         },
  //         queuedRequests: [],
  //         closingLock: {
  //           _locking: {},
  //           _locks: 0,
  //         },
  //         connectionLock: {
  //           _locking: {},
  //           _locks: 0,
  //         },
  //         options: {
  //           autoSubscribe: true,
  //           adaptiveStream: false,
  //           maxRetries: 1,
  //           e2eeEnabled: false,
  //           websocketTimeout: 15000,
  //         },
  //         connectOptions: {
  //           autoSubscribe: true,
  //           adaptiveStream: false,
  //           maxRetries: 1,
  //           e2eeEnabled: false,
  //           websocketTimeout: 15000,
  //         },
  //         pingTimeoutDuration: 15,
  //         pingIntervalDuration: 5,
  //         pingTimeout: 216,
  //         pingInterval: 56,
  //       },
  //       volumeMap: {},
  //       permissions: {
  //         canSubscribe: true,
  //         canPublish: true,
  //         canPublishData: true,
  //         hidden: false,
  //         recorder: false,
  //         canPublishSources: [],
  //         canUpdateMetadata: true,
  //         agent: true,
  //         canSubscribeMetrics: false,
  //       },
  //       participantInfo: {
  //         sid: "PA_APGPK5ARmdA7",
  //         identity: "agent-AJ_ML2BeYmzmmwJ",
  //         state: "ACTIVE",
  //         tracks: [
  //           {
  //             sid: "TR_AMPR86vzHQ8zN7",
  //             type: "AUDIO",
  //             name: "assistant_voice",
  //             muted: false,
  //             width: 0,
  //             height: 0,
  //             simulcast: false,
  //             disableDtx: false,
  //             source: "MICROPHONE",
  //             layers: [],
  //             mimeType: "audio/red",
  //             mid: "0",
  //             codecs: [],
  //             stereo: false,
  //             disableRed: false,
  //             encryption: "NONE",
  //             stream: "camera",
  //             version: {
  //               unixMicro: "1746170739417361",
  //               ticks: 0,
  //             },
  //             audioFeatures: [],
  //             backupCodecPolicy: "PREFER_REGRESSION",
  //           },
  //         ],
  //         metadata: "",
  //         joinedAt: "1746170731",
  //         name: "",
  //         version: 13,
  //         permission: {
  //           canSubscribe: true,
  //           canPublish: true,
  //           canPublishData: true,
  //           hidden: false,
  //           recorder: false,
  //           canPublishSources: [],
  //           canUpdateMetadata: true,
  //           agent: true,
  //           canSubscribeMetrics: false,
  //         },
  //         region: "omumbai1b",
  //         isPublisher: true,
  //         kind: "AGENT",
  //         attributes: {
  //           "lk.agent.state": "listening",
  //         },
  //         disconnectReason: "UNKNOWN_REASON",
  //         joinedAtMs: "1746170731958",
  //         kindDetails: [],
  //       },
  //       lastSpokeAt: "2025-05-02T07:26:41.716Z",
  //     },
  //     publication: {
  //       _events: {},
  //       _eventsCount: 9,
  //       _maxListeners: 100,
  //       metadataMuted: false,
  //       encryption: 0,
  //       log: {
  //         name: "livekit-track-publication",
  //         levels: {
  //           TRACE: 0,
  //           DEBUG: 1,
  //           INFO: 2,
  //           WARN: 3,
  //           ERROR: 4,
  //           SILENT: 5,
  //         },
  //       },
  //       kind: "audio",
  //       trackSid: "TR_AMPR86vzHQ8zN7",
  //       trackName: "assistant_voice",
  //       source: "microphone",
  //       allowed: true,
  //       disabled: false,
  //       currentVideoQuality: 2,
  //       subscribed: true,
  //       mimeType: "audio/red",
  //       trackInfo: {
  //         sid: "TR_AMPR86vzHQ8zN7",
  //         type: "AUDIO",
  //         name: "assistant_voice",
  //         muted: false,
  //         width: 0,
  //         height: 0,
  //         simulcast: false,
  //         disableDtx: false,
  //         source: "MICROPHONE",
  //         layers: [],
  //         mimeType: "audio/red",
  //         mid: "0",
  //         codecs: [],
  //         stereo: false,
  //         disableRed: false,
  //         encryption: "NONE",
  //         stream: "camera",
  //         version: {
  //           unixMicro: "1746170739417361",
  //           ticks: 0,
  //         },
  //         audioFeatures: [],
  //         backupCodecPolicy: "PREFER_REGRESSION",
  //       },
  //     },
  //   },
  // ];

  console.log("transcription", transcription);

  // Update transcript when agentTranscriptions change
  // useEffect(() => {
  //   if (agentTranscriptions.length > 0) {
  //     const latestAgentTranscript =
  //       agentTranscriptions[agentTranscriptions.length - 1];

  //     setTranscripts((prev) => {
  //       // Check if the last transcript is from the agent and update it instead of adding a new one
  //       if (prev.length > 0 && prev[prev.length - 1].type === "agent") {
  //         return [
  //           ...prev.slice(0, -1), // Keep everything except the last agent message
  //           { ...latestAgentTranscript, type: "agent" }, // Update the latest agent message
  //         ];
  //       }

  //       // If it's a new agent response, add it to the conversation
  //       return [...prev, { ...latestAgentTranscript, type: "agent" }];
  //     });
  //   }
  // }, [agentTranscriptions]);

  // Update transcript when userTranscriptions change
  // useEffect(() => {
  //   if (userTranscriptions.length > 0) {
  //     const latestUserTranscript =
  //       userTranscriptions[userTranscriptions.length - 1];

  //     setTranscripts((prev) => {
  //       // Check if the last transcript is from the user and update it instead of adding a new one
  //       if (prev.length > 0 && prev[prev.length - 1].type === "user") {
  //         return [
  //           ...prev.slice(0, -1), // Keep everything except the last user message
  //           { ...latestUserTranscript, type: "user" }, // Update the latest user message
  //         ];
  //       }

  //       // If it's a new user response, add it to the conversation
  //       return [...prev, { ...latestUserTranscript, type: "user" }];
  //     });
  //   }
  // }, [userTranscriptions]);

  return (
    <div className="p-4 bg-white w-full rounded-xl shadow-sm h-[600px]">
      <ScrollArea className="h-full w-full p-4">
        {/* {transcripts.map((transcript, index) => (
          <div
            key={index} // Use index since `id` might not always exist
            className={`flex mb-2 ${
              transcript.type === "user" ? "justify-end" : "justify-start"
            }`}
          ></div>
        ))} */}

        {/* {displayTranscriptions.map(
          ({ segment, participant }) =>
            segment.text.trim() !== "" && (
              <AgentChat transcript={segment.text.trim()} key={segment.id} />
            )
        )} */}

        {transcription.map(({ segment, participant }) =>
          segment.text.trim() !== "" ? (
            !participant?.isAgent ? (
              <UserChat
                transcript={segment.text.trim()}
                key={segment.id}
                firstReceivedTime={segment.firstReceivedTime}
                lastReceivedTime={segment.lastReceivedTime}
              />
            ) : (
              <AgentChat
                transcript={segment.text.trim()}
                key={segment.id}
                firstReceivedTime={segment.firstReceivedTime}
                lastReceivedTime={segment.lastReceivedTime}
              />
            )
          ) : null
        )}
      </ScrollArea>
    </div>
  );
}
