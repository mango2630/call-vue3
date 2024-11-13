const ButtonPanelMobileConfig: any = {
  singleCall: {
    video: {
      calling: [
        [], [
          {},
          { name: 'hangup' },
          {},
        ],
      ],
      accept: [
        [], [
          { name: 'reject', customStyle: { justifyContent: 'flex-end' }  },
          {},
          { name: 'accept', customStyle: { justifyContent: 'flex-start' } },
        ]
      ],
      connected: [
        [
          { name: 'microphone', customStyle: { justifyContent: 'flex-start' }, props: {} },
          { name: 'speaker' },
          { name: 'camera', customStyle: { justifyContent: 'flex-end' }, props: {} },
        ], [
          {},
          { name: 'hangup', customStyle: { paddingTop: '6vh' } },
          { name: 'switchCamera', customStyle: { justifyContent: 'center', paddingTop: '6vh' }, props: {} },
        ]
      ],
    },
    audio: {
      calling: [
        [], [
          {},
          { name: 'hangup' },
          {},
        ]
      ],
      accept: [
        [], [
          { name: 'reject', customStyle: { justifyContent: 'flex-end' }  },
          {},
          { name: 'accept', customStyle: { justifyContent: 'flex-start' } },
        ]
      ],
      connected: [
        [], [
          { name: 'microphone', customStyle: { justifyContent: 'flex-start' }, props: {} },
          { name: 'hangup' },
          { name: 'speaker', customStyle: { justifyContent: 'flex-end' } },
        ]
      ],
    },
  },
  groupCall: {
    video: {
      calling: [[
        { name: 'microphone', customStyle: { justifyContent: 'flex-start' }, props: {} },
        { name: 'speaker' },
        { name: 'camera', customStyle: { justifyContent: 'flex-end' }, props: {} },
      ], [
        {},
        { name: 'hangup', customStyle: { paddingTop: '6vh' } },
        {},
      ]],
      accept: [
        [], [
          { name: 'reject' },
          { name: 'accept' },
        ],
      ],
      connected: [
        [
          { name: 'microphone', customStyle: { justifyContent: 'flex-start' }, props: {} },
          { name: 'speaker' },
          { name: 'camera', customStyle: { justifyContent: 'flex-end' }, props: {} },
        ], [
          {},
          { name: 'hangup', customStyle: { paddingTop: '6vh' } },
          {},
        ]
      ],
      close_calling: [
        [
          { name: 'microphone', props: {} },
          { name: 'speaker' },
          { name: 'camera', props: {} },
          { name: 'hangup' },
        ]
      ],
      close_connected: [
        [
          { name: 'microphone', props: {} },
          { name: 'speaker' },
          { name: 'camera', props: {} },
          { name: 'hangup' },
        ]
      ],
    },
    audio: {
      calling: [[
        { name: 'microphone', customStyle: { justifyContent: 'flex-start' }, props: {} },
        { name: 'speaker' },
        { name: 'camera', customStyle: { justifyContent: 'flex-end' }, props: {} },
      ], [
        {},
        { name: 'hangup', customStyle: { paddingTop: '6vh' } },
        {},
      ]],
      accept: [
        [], [
          { name: 'reject' },
          { name: 'accept' },
        ]
      ],
      connected: [
        [
          { name: 'microphone', customStyle: { justifyContent: 'flex-start' }, props: {} },
          { name: 'speaker' },
          { name: 'camera', customStyle: { justifyContent: 'flex-end' }, props: {} },
        ], [
          {},
          { name: 'hangup', customStyle: { paddingTop: '6vh' } },
          {},
        ]
      ],
      close_calling: [
        [
          { name: 'microphone', props: {} },
          { name: 'speaker' },
          { name: 'camera', props: {} },
          { name: 'hangup' },
        ]
      ],
      close_connected: [
        [
          { name: 'microphone', props: {} },
          { name: 'speaker' },
          { name: 'camera', props: {} },
          { name: 'hangup' },
        ]
      ],
    },
  },
};

// @if process.env.BUILD_TARGET!='MINI'
const ButtonPanelPCConfig = {
  singleCall: {
    video: {
      calling: [
        [
          { name: 'camera', props: {} },
          { name: 'microphone', props: {} },
          { name: 'hangup' },
        ],
      ],
      accept: [
        [
          { name: 'camera', props: {} },
          { name: 'reject' },
          { name: 'accept' },
        ],
      ],
      connected: [
        [
          { name: 'camera', props: {} },
          { name: 'microphone', props: {} },
          { name: 'speaker' },
          { name: 'hangup' },
        ],
      ],
    },
    audio: {
      calling: [
        [
          { name: 'microphone', props: {} },
          { name: 'hangup' },
        ],
      ],
      accept: [
        [
          { name: 'reject' },
          { name: 'accept' },
        ],
      ],
      connected: [
        [
          { name: 'microphone', props: {} },
          { name: 'speaker' },
          { name: 'hangup' },
        ],
      ],
    }
  },
  groupCall: {
    video: {
      calling: [[
        { name: 'camera', props: {} },
        { name: 'microphone', props: {} },
        { name: 'inviteUser', props: {} },
        { name: 'hangup' },
      ]],
      accept: [
        [
          { name: 'reject' },
          { name: 'accept' },
        ],
      ],
      connected: [
        [
          { name: 'camera', props: {} },
          { name: 'microphone', props: {} },
          { name: 'speaker' },
          { name: 'inviteUser', props: {} },
          { name: 'hangup' },
        ],
      ],
    },
    audio: {
      calling: [
        [
          { name: 'microphone', props: {} },
          { name: 'hangup' },
        ],
      ],
      accept: [
        [
          { name: 'reject' },
          { name: 'accept' },
        ],
      ],
      connected: [
        [
          { name: 'microphone', props: {} },
          { name: 'speaker' },
          { name: 'inviteUser', props: {} },
          { name: 'hangup' },
        ],
      ],
    },
  },
};
// @endif

export const ButtonPanelConfig = {
  // @if process.env.BUILD_TARGET!='MINI'
  pc: ButtonPanelPCConfig,
  // @endif
  mobile: ButtonPanelMobileConfig,
};
