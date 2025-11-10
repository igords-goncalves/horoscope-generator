export const EVENTS = {
  PAGE_VIEWED: {
    name: 'Page Viewed',
    props: {
      PATH: 'path',
      TITLE: 'title',
    },
  },

  DATE_SELECTED: {
    name: 'Date Selected',
    props: {
      INPUT_METHOD: 'input_method', // 'date-picker' | 'manual'
      VALUE: 'value', // 'YYYY-MM-DD'
    },
  },

  GENERATE_CLICKED: {
    name: 'Generate Clicked',
    props: {
      LATENCY_MS: 'latency_ms',
    },
  },

  SIGN_VIEWED: {
    name: 'Sign Viewed',
    props: {
      SIGN: 'sign',
      GENERATION_TIME_MS: 'generation_time_ms',
      SOURCE: 'source',
    },
  },

  SHARE_ATTEMPTED: {
    name: 'Share Attempted',
    props: {
      CHANNEL: 'channel',
      SIGN: 'sign',
    },
  },

  ERROR_OCCURRED: {
    name: 'Error Occurred',
    props: {
      STAGE: 'stage',
      MESSAGE: 'message',
      CODE: 'code',
    },
  },

  IDENTIFY: {
    name: 'Identify',
    props: {
      USER_ID: 'user_id',
      CONSENT: 'consent',
    },
  },

  EXPERIMENT_VIEW: {
    name: 'exposure',
    props: {
      EXPERIMENT_KEY: 'experiment_key',
      VARIANT: 'variant',
    },
  },
} as const;