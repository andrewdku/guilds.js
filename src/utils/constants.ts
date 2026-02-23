export const ActivityTypes = {
    Competing: 5,
    Custom: 4,
    Listening: 2,
    Playing: 0,
    Streaming: 1,
    Watching: 3,
} as const;

export const baseApiUrl = "https://discord.com/api/v10";
export const GatewayOpcodes = {
    /** Receive */
    Dispatch: 0,

    /** Send or Receive */
    Heartbeat: 1,

    /** Receive */
    HeartbeatACK: 11,

    /** Receive */
    Hello: 10,

    /** Send */
    Identify: 2,

    /** Receive */
    InvalidSession: 9,

    /** Send */
    PresenceUpdate: 3,

    /** Receive */
    Reconnect: 7,

    /** Send */
    RequestGuildMembers: 8,

    /** Send */
    RequestSoundboardSounds: 12,

    /** Send */
    Resume: 6,

    /** Send */
    VoiceStateUpdate: 3,
} as const;
