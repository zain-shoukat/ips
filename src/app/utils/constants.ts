enum LANGUAGE {
  EN = 'EN',
  UR = 'UR',
  AR = 'AR',
  RU = 'RU',
}

const TOKEN_SECRET = 'MIIEpAIBAAKCAQEA4MQE6YpPLQ8K/VCoXGpTLLnmG5Gp3Ejhs6ZkP+FjYlOT1uvD'
const actions = [
  {
       "organization": {
         "CREATE_ORGANIZATION": "CREATE_ORGANIZATION",
         "CREATE_APP": "CREATE_APP",
         "EDIT_ORGANIZATION": "EDIT_ORGANIZATION",
         "EDIT_APP": "EDIT_APP",
         "ROUTE_CREATE_ORGANIZATION": "ROUTE_CREATE_ORGANIZATION"
       }
     },
     {
       "course": {
         "CREATE_COURSE": "CREATE_COURSE",
         "EDIT_COURSE": "EDIT_COURSE",
         "ADD_SECTION": "ADD_SECTION",
         "ADD_CHAPTER": "ADD_CHAPTER",
         "ADD_LESSON": "ADD_LESSON",
         "ADD_VIDEO_LESSON": "ADD_VIDEO_LESSON",
         "ADD_AUDIO_LESSON": "ADD_AUDIO_LESSON",
         "ADD_PDF_LESSON": "ADD_PDF_LESSON",
         "ADD_TEXT_LESSON": "ADD_TEXT_LESSON",
         "ADD_DOCUMENT_LESSON": "ADD_DOCUMENT_LESSON"
       }
     },
     {
       "quiz": {
         "CREATE_QUIZ": "CREATE_QUIZ",
         "EDIT_QUIZ": "EDIT_QUIZ",
         "QUIZ_TYPE": "QUIZ_TYPE",
         "FEEDBACK_AFTER_EACH_ATTEMPT": "FEEDBACK_AFTER_EACH_ATTEMPT",
         "FEEDBACK_AFTER_QUIZSETTING": "FEEDBACK_AFTER_QUIZSETTING"
       }
     }
   ]

const DEFAULT_PAGE_LIMIT = 10;
const DEFAULT_PAGE_NO = 1;

const DEFAULT_SORTING_ORDER = 'DESC';

type SortingOrder = 'ASC' | 'DESC';

enum SORTING_COLUMNS {
  ID = 'id',
  UPDATED_AT = 'updatedAt',
}

export {
  LANGUAGE as Language,
  DEFAULT_PAGE_LIMIT,
  DEFAULT_PAGE_NO,
  DEFAULT_SORTING_ORDER,
  SortingOrder,
  SORTING_COLUMNS,
  actions as ACTIONS,
  TOKEN_SECRET
};
