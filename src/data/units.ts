export interface Track {
  id: string;
  title: string;
  lesson: string;
  url: string;
  type: 'audio' | 'video';
  badge: string;
}

export interface LessonGroup {
  name: string;
  tracks: Track[];
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  lessons: LessonGroup[];
}

export function extractBadgeFromUrl(url: string, type: 'audio' | 'video'): string {
  if (type === 'video') return 'VÍDEO';
  
  // Try to find page number in URL, like PAG_22, _72_, _154_, etc.
  const pagMatch = url.match(/PAG[_-]?(\d+)/i);
  if (pagMatch) {
    return `PÁG ${pagMatch[1]}`;
  }

  // Look for 2 or 3 digit number preceded or followed by underscore before file extension
  const numMatch = url.match(/_(\d{2,3})(?:_|\.mp3|\.MP3)/);
  if (numMatch) {
    return `PÁG ${numMatch[1]}`;
  }

  // Look for single digit guide (e.g. GUIDE_1, GUIDE_2)
  const guideMatch = url.match(/GUIDE_(\d)/i);
  if (guideMatch) {
    return `GUIA ${guideMatch[1]}`;
  }

  return 'ÁUDIO';
}

export const UNITS_DATA: Unit[] = [
  {
    id: 'unit-1',
    number: 1,
    title: 'UNIT 1',
    lessons: [
      {
        name: 'LESSON A',
        tracks: [
          {
            id: '1a-words-ideas',
            title: '1A Words and Ideas',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790183998/XP1-_1A_WORDS_AND_IDEAS_10_kstbpx.mp3',
            type: 'audio',
            badge: 'PÁG 10',
          },
          {
            id: '1a-target-situation',
            title: '1A Target Situation',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182585/XP1-1A_TARGET_SITUATION_11_afvvz7.mp3',
            type: 'audio',
            badge: 'PÁG 11',
          },
          {
            id: '1a-language-guide',
            title: '1A Language Guide',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182584/XP1-1A_LANGUAGE_GUIDE_12_ofp1xb.mp3',
            type: 'audio',
            badge: 'PÁG 12',
          },
          {
            id: '1a-cross-curricular',
            title: '1A Cross Curricular',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182596/XP1-1A_CROSS_CURRICULAR_13_c6bqtr.mp4',
            type: 'video',
            badge: 'VÍDEO',
          },
        ],
      },
      {
        name: 'LESSON B',
        tracks: [
          {
            id: '1b-words-ideas',
            title: '1B Words and Ideas',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182585/XP1-1B_WORDS_AND_IDEAS_16_nk6o5k.mp3',
            type: 'audio',
            badge: 'PÁG 16',
          },
          {
            id: '1b-target-situation',
            title: '1B Target Situation',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182585/XP1-1B_TARGET_SITUATION_17_hxml11.mp3',
            type: 'audio',
            badge: 'PÁG 17',
          },
          {
            id: '1b-cross-curricular',
            title: '1B Cross Curricular',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182575/XP1_-_1B_CROSS_CURRICULAR_19_y9lrmu.mp4',
            type: 'video',
            badge: 'VÍDEO',
          },
        ],
      },
      {
        name: 'LESSON C',
        tracks: [
          {
            id: '1c-words-ideas',
            title: '1C Words and Ideas',
            lesson: 'Lesson C',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182570/XP1_-_1C_WORDS_AND_IDEAS_PAG_22.MP3_jeplgh.mp3',
            type: 'audio',
            badge: 'PÁG 22',
          },
          {
            id: '1c-target-situation',
            title: '1C Target Situation',
            lesson: 'Lesson C',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182586/XP1-1C_TARGET_SITUATION_23_cory7s.mp3',
            type: 'audio',
            badge: 'PÁG 23',
          },
          {
            id: '1c-cross-curricular',
            title: '1C Cross Curricular',
            lesson: 'Lesson C',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182571/XP1_-_1C_CROSS_CURRICULAR_25_ptu9t4.mp4',
            type: 'video',
            badge: 'VÍDEO',
          },
        ],
      },
      {
        name: 'LESSON D',
        tracks: [
          {
            id: '1d-video-activity',
            title: '1D Video Activity',
            lesson: 'Lesson D',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182589/XP1_-_1D_VIDEO_ACTIVITY_27_d3qxqp.mp4',
            type: 'video',
            badge: 'VÍDEO',
          },
        ],
      },
    ],
  },
  {
    id: 'unit-2',
    number: 2,
    title: 'UNIT 2',
    lessons: [
      {
        name: 'LESSON A',
        tracks: [
          {
            id: '2a-words-ideas',
            title: '2A Words and Ideas',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790184021/XP1-_2A_WORDS_AND_IDEAS_30.mp3_mdz7ph.mp3',
            type: 'audio',
            badge: 'PÁG 30',
          },
          {
            id: '2a-cross-curricular',
            title: '2A Cross Curricular',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182586/XP1-2A_CROSS_CURRICULAR_36_ymife2.mp3',
            type: 'audio',
            badge: 'PÁG 36',
          },
        ],
      },
      {
        name: 'LESSON B',
        tracks: [
          {
            id: '2b-target-situation',
            title: '2B Target Situation',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182586/XP1-2B_TARGET_SITUATION_39_rrlyzw.mp3',
            type: 'audio',
            badge: 'PÁG 39',
          },
          {
            id: '2b-language-guide-1',
            title: '2B Language Guide 1',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790184066/XP1-2B_lANGUAGE_GUIDE_1_jykejc.mp3',
            type: 'audio',
            badge: 'GUIA 1',
          },
          {
            id: '2b-language-guide-2',
            title: '2B Language Guide 2',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790184067/XP1-2B_LANGUAGE_GUIDE_2_d3cgph.mp3',
            type: 'audio',
            badge: 'GUIA 2',
          },
          {
            id: '2b-language-work',
            title: '2B Language at Work',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1786366053/XP1_-_2B_LANGUAGE_AT_WORK_nfsuy9.mp3',
            type: 'audio',
            badge: 'ÁUDIO',
          },
          {
            id: '2b-cross-curricular',
            title: '2B Cross Curricular',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182586/XP1-2B_CROSS_CURRICULAR_41_zztnoa.mp3',
            type: 'audio',
            badge: 'PÁG 41',
          },
        ],
      },
      {
        name: 'LESSON C',
        tracks: [
          {
            id: '2c-cross-curricular',
            title: '2C Cross Curricular',
            lesson: 'Lesson C',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182576/XP1_-_2C_CROSS_CURRILCULAR_47_zuuh4v.mp4',
            type: 'video',
            badge: 'VÍDEO',
          },
        ],
      },
    ],
  },
  {
    id: 'unit-3',
    number: 3,
    title: 'UNIT 3',
    lessons: [
      {
        name: 'LESSON A',
        tracks: [
          {
            id: '3a-target-situation',
            title: '3A Target Situation',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182586/XP1-3A_TARGET_SITUATION_53_w1dfgy.mp3',
            type: 'audio',
            badge: 'PÁG 53',
          },
          {
            id: '3a-language-guide',
            title: '3A Language Guide',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182571/XP1_-_3A_LANGUAGE_GUIDE_54.mp3_acw2aa.mp3',
            type: 'audio',
            badge: 'PÁG 54',
          },
        ],
      },
      {
        name: 'LESSON B',
        tracks: [
          {
            id: '3b-target-situation',
            title: '3B Target Situation',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790184103/XP1-_3B_TARGET_SITUATION_59_koykhn.mp3',
            type: 'audio',
            badge: 'PÁG 59',
          },
          {
            id: '3b-cross-curricular',
            title: '3B Cross Curricular',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182572/XP1_-_3B_CROSS_CURRICULAR_61.MP3_pwym03.mp3',
            type: 'audio',
            badge: 'PÁG 61',
          },
        ],
      },
      {
        name: 'LESSON C',
        tracks: [
          {
            id: '3c-words-ideas',
            title: '3C Words and Ideas',
            lesson: 'Lesson C',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182587/XP1-3C_WORDS_AND_IDEAS_64_km3rtl.mp3',
            type: 'audio',
            badge: 'PÁG 64',
          },
          {
            id: '3c-target-situation',
            title: '3C Target Situation',
            lesson: 'Lesson C',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790184139/XP1_3C_TARGET_SITUATION_65_bfakpe.mp3',
            type: 'audio',
            badge: 'PÁG 65',
          },
          {
            id: '3c-cross-curricular',
            title: '3C Cross Curricular',
            lesson: 'Lesson C',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182574/XP1_-_3C_CROSS_CURRICULAR_67_qj5wul.mp4',
            type: 'video',
            badge: 'VÍDEO',
          },
        ],
      },
    ],
  },
  {
    id: 'unit-4',
    number: 4,
    title: 'UNIT 4',
    lessons: [
      {
        name: 'LESSON A',
        tracks: [
          {
            id: '4a-words-ideas',
            title: '4A Words and Ideas',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182587/XP1-4A_WORDS_AND_IDEAS_72_dzxjhu.mp3',
            type: 'audio',
            badge: 'PÁG 72',
          },
          {
            id: '4a-target-situation',
            title: '4A Target Situation',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182583/XP1-_4A_TARGET_SITUATION_73_wpjs2l.mp3',
            type: 'audio',
            badge: 'PÁG 73',
          },
          {
            id: '4a-language-guide',
            title: '4A Language Guide',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182573/XP1_-_4A_LANGUAGE_GUIDE_73_uaekau.mp3',
            type: 'audio',
            badge: 'PÁG 73',
          },
        ],
      },
      {
        name: 'LESSON B',
        tracks: [
          {
            id: '4b-words-ideas',
            title: '4B Words and Ideas',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182588/XP1-4B_WORDS_AND_IDEIAS_80_tdhmld.mp3',
            type: 'audio',
            badge: 'PÁG 80',
          },
          {
            id: '4b-target-situation',
            title: '4B Target Situation',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182587/XP1-4B_TARGET_SITUATION_81_imya77.mp3',
            type: 'audio',
            badge: 'PÁG 81',
          },
        ],
      },
      {
        name: 'LESSON C',
        tracks: [
          {
            id: '4c-target-situation',
            title: '4C Target Situation',
            lesson: 'Lesson C',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182588/XP1-4C_TARGET_SITUATION_89_zqj8uw.mp3',
            type: 'audio',
            badge: 'PÁG 89',
          },
          {
            id: '4c-cross-curricular',
            title: '4C Cross Curricular',
            lesson: 'Lesson C',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182576/XP1_-_4C_CROSS_CURRICULAR_91_j4uzvh.mp4',
            type: 'video',
            badge: 'VÍDEO',
          },
        ],
      },
    ],
  },
  {
    id: 'unit-5',
    number: 5,
    title: 'UNIT 5',
    lessons: [
      {
        name: 'LESSON A',
        tracks: [
          {
            id: '5a-words-ideas',
            title: '5A Words and Ideas',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182588/XP1-5A_WORDS_AND_IDEAS_96_ohn1ee.mp3',
            type: 'audio',
            badge: 'PÁG 96',
          },
          {
            id: '5a-target-situation',
            title: '5A Target Situation',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182588/XP1-5A_TARGET_SITUATION_98_zlgsaw.mp3',
            type: 'audio',
            badge: 'PÁG 98',
          },
          {
            id: '5a-cross-curricular',
            title: '5A Cross Curricular',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790184427/XP1-5A_CROSS_CURRICULAR_101_j71j7l.mp4',
            type: 'video',
            badge: 'VÍDEO',
          },
        ],
      },
      {
        name: 'LESSON B',
        tracks: [
          {
            id: '5b-words-ideas',
            title: '5B Words and Ideas',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182589/XP1-5B_WORDS_AND_IDEAS_104_xpswux.mp3',
            type: 'audio',
            badge: 'PÁG 104',
          },
          {
            id: '5b-target-situation',
            title: '5B Target Situation',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182588/XP1-5B_TARGET_SITUATION_105_wug770.mp3',
            type: 'audio',
            badge: 'PÁG 105',
          },
          {
            id: '5b-cross-curricular',
            title: '5B Cross Curricular',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182588/XP1-5B_CROSS_CURRICULAR_109_ftranf.mp3',
            type: 'audio',
            badge: 'PÁG 109',
          },
        ],
      },
      {
        name: 'LESSON C',
        tracks: [
          {
            id: '5c-target-situation',
            title: '5C Target Situation',
            lesson: 'Lesson C',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182584/XP1-_5C_TARGET_SITUATION_113_m3dlaa.mp3',
            type: 'audio',
            badge: 'PÁG 113',
          },
          {
            id: '5c-cross-curricular',
            title: '5C Cross Curricular',
            lesson: 'Lesson C',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182574/XP1_-_5C_CROSS_CURRICULAR_117_cwxh93.mp3',
            type: 'audio',
            badge: 'PÁG 117',
          },
        ],
      },
    ],
  },
  {
    id: 'unit-6',
    number: 6,
    title: 'UNIT 6',
    lessons: [
      {
        name: 'LESSON A',
        tracks: [
          {
            id: '6a-target-situation',
            title: '6A Target Situation',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182575/XP1-_6A_TARGET_SITUATION_126_bcwelh.mp3',
            type: 'audio',
            badge: 'PÁG 126',
          },
          {
            id: '6a-cross-curricular',
            title: '6A Cross Curricular',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182578/XP1_-_6A_CROSS_CURRICULAR_129_eajpo9.mp4',
            type: 'video',
            badge: 'VÍDEO',
          },
        ],
      },
      {
        name: 'LESSON B',
        tracks: [
          {
            id: '6b-words-ideas',
            title: '6B Words and Ideas',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182577/XP1_-_6B_WORDS_AND_IDEAS_132_w9pba0.mp3',
            type: 'audio',
            badge: 'PÁG 132',
          },
          {
            id: '6b-target-situation',
            title: '6B Target Situation',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182584/XP1_6B_TARGET_SITUATION_133.MP3_gjazac.mp3',
            type: 'audio',
            badge: 'PÁG 133',
          },
          {
            id: '6b-cross-curricular',
            title: '6B Cross Curricular',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182581/XP1_-_6B_CROSS_CURRICULAR_137_ysxt0o.mp4',
            type: 'video',
            badge: 'VÍDEO',
          },
        ],
      },
      {
        name: 'LESSON C',
        tracks: [
          {
            id: '6c-words-ideas',
            title: '6C Words and Ideas',
            lesson: 'Lesson C',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182589/XP1-6C_WORDS_AND_IDEAS_140_drzhlc.mp3',
            type: 'audio',
            badge: 'PÁG 140',
          },
          {
            id: '6c-target-situation',
            title: '6C Target Situation',
            lesson: 'Lesson C',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182589/XP1-6C_TARGET_SITUATION_141_hovucg.mp3',
            type: 'audio',
            badge: 'PÁG 141',
          },
          {
            id: '6c-cross-curricular',
            title: '6C Cross Curricular',
            lesson: 'Lesson C',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182583/XP1_-_6C_CROSS_CURRICULAR_143_gakng1.mp4',
            type: 'video',
            badge: 'VÍDEO',
          },
        ],
      },
    ],
  },
  {
    id: 'unit-7',
    number: 7,
    title: 'UNIT 7',
    lessons: [
      {
        name: 'LESSON A',
        tracks: [
          {
            id: '7a-words-ideas',
            title: '7A Words and Ideas',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182578/XP1_-_7A_WORDS_AND_IDEAS_150_ixyjvb.mp3',
            type: 'audio',
            badge: 'PÁG 150',
          },
          {
            id: '7a-target-situation',
            title: '7A Target Situation',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182590/XP1-7A_TARGET_SITUATION_151_ex2t2u.mp3',
            type: 'audio',
            badge: 'PÁG 151',
          },
          {
            id: '7a-language-guide',
            title: '7A Language Guide',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182589/XP1-7A_LANGUAGE_GUIDE_154_aglbyk.mp3',
            type: 'audio',
            badge: 'PÁG 154',
          },
          {
            id: '7a-language-work',
            title: '7A Language At Work',
            lesson: 'Lesson A',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182578/XP1_-_7A_LANGUAGE_AT_WORK_154_rvinxe.mp3',
            type: 'audio',
            badge: 'PÁG 154',
          },
        ],
      },
      {
        name: 'LESSON B',
        tracks: [
          {
            id: '7b-words-ideas',
            title: '7B Words and Ideas',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182579/XP1_-_7B_WORDS_AND_IDEAS_158_k1ilup.mp3',
            type: 'audio',
            badge: 'PÁG 158',
          },
          {
            id: '7b-target-situation',
            title: '7B Target Situation',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182570/XP_1_-_7B_TARGET_SITUATION.MP3_159_tpdxpn.mp3',
            type: 'audio',
            badge: 'PÁG 159',
          },
          {
            id: '7b-cross-curricular',
            title: '7B Cross Curricular',
            lesson: 'Lesson B',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182580/XP1_-_7B_CROSS_CURRICULAR_161_z4svvk.mp4',
            type: 'video',
            badge: 'VÍDEO',
          },
        ],
      },
      {
        name: 'LESSON C',
        tracks: [
          {
            id: '7c-words-ideas',
            title: '7C Words and Ideas',
            lesson: 'Lesson C',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182581/XP1_-_7C_WORDS_AND_IDEAS_164_n8td6o.mp3',
            type: 'audio',
            badge: 'PÁG 164',
          },
          {
            id: '7c-language-guide',
            title: '7C Language Guide',
            lesson: 'Lesson C',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182590/XP1-7C_LANGUAGE_GUIDE_167.MP3_blelfx.mp3',
            type: 'audio',
            badge: 'PÁG 167',
          },
          {
            id: '7c-cross-curricular',
            title: '7C Cross Curricular',
            lesson: 'Lesson C',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182582/XP1_-_7C_CROSS_CURRICULAR_169_xo6kv0.mp4',
            type: 'video',
            badge: 'VÍDEO',
          },
        ],
      },
      {
        name: 'LESSON D',
        tracks: [
          {
            id: '7d-words-ideas',
            title: '7D Words and Ideas',
            lesson: 'Lesson D',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182581/XP1_-_7D_WORDS_AND_IDEAS_172_eopcxy.mp3',
            type: 'audio',
            badge: 'PÁG 172',
          },
          {
            id: '7d-target-situation',
            title: '7D Target Situation',
            lesson: 'Lesson D',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182590/XP1-7D_TARGET_SITUATION_173_n3a10o.mp3',
            type: 'audio',
            badge: 'PÁG 173',
          },
        ],
      },
      {
        name: 'LESSON E',
        tracks: [
          {
            id: '7e-words-ideas',
            title: '7E Words and Ideas',
            lesson: 'Lesson E',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790184467/XP1_-_7E_WORDS_AND_IDEAS_puwbu6.mp3',
            type: 'audio',
            badge: 'PÁG 182',
          },
          {
            id: '7e-target-situation',
            title: '7E Target Situation',
            lesson: 'Lesson E',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182591/XP1-7E_TARGET_SITUATION_183_djhdq0.mp3',
            type: 'audio',
            badge: 'PÁG 183',
          },
          {
            id: '7e-language-guide',
            title: '7E Language Guide',
            lesson: 'Lesson E',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182590/XP1-7E_LANGUAGE_GUIDE_184_ttufzp.mp3',
            type: 'audio',
            badge: 'PÁG 184',
          },
          {
            id: '7e-cross-curricular',
            title: '7E Cross Curricular',
            lesson: 'Lesson E',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790184217/XP1_-_7E_CROSS_CURRICULAR_187_kql5sz.mp4',
            type: 'video',
            badge: 'VÍDEO',
          },
          {
            id: '7e-now-turn',
            title: "7E Now It's Your Turn",
            lesson: 'Lesson E',
            url: 'https://res.cloudinary.com/pfrqadfm/video/upload/v1790182582/XP1_-_7E_NOW_IT_S_YOUR_TURN_188_qgjruj.mp3',
            type: 'audio',
            badge: 'PÁG 188',
          },
        ],
      },
    ],
  },
];
