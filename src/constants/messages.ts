export const MESSAGES = {
    STUDENT_SERVICE: {
        CREATED: 'Student successfully created',
        DELETED: 'Student successfully deleted',
        UPDATED: 'Student successfully updated',

        SUCCESS_FETCHED: 'Student data successfully fetched',
        NOT_FOUND: 'Student not found'
    },

    TEACHER_SERVICE: {
        CREATED: 'Teacher successfully created',
        DELETED: 'Teacher successfully deleted',
        UPDATED: 'Teacher successfully updated',

        SUCCESS_FETCHED: 'Teacher data successfully fetched',
        NOT_FOUND: 'Teacher not found'
    },

    USERS_SERVICE: {
        PROCESS_APPROVE: 'User successfully approved',
        PROCESS_REJECT: 'User successfully rejected',
        PROCESS_CANNOT_FIND_USER: 'Cannot find user to process',

        SUCCESS_FETCHED: 'Users successfully fetched',
        NOT_FOUND: 'Users not found',

        AUTH_INVALID_CREDENTIALS: 'Invalid username or password',
        AUTH_SUCCESS: 'User successfully authenticated',

        PENDING_ACCOUNT_STATUS: 'Your account is still in pending status. Kindly wait for the admin to approve your registration',
        REJECTED_ACCOUNT_STATUS: 'Sorry it seems like your registration has been rejected by the admin',

        GENERATE_LEVEL_EMPTY_LEVEL: 'It seems that there are no game levels to generate for the student'


    },

    ADMIN_SERVICE: {
        CREATED: 'Admin successfully created',
        DELETED: 'Admin successfully deleted',
        UPDATED: 'Admin successfully updated',

        SUCCESS_FETCHED: 'Admin data successfully fetched',
        NOT_FOUND: 'Admin not found'
    },

    GAME_LEVEL_SERVICE: {
        CREATED: 'Game Level Successfully Created',
        DELETED: 'Game Level Successfully Deleted',
        UPDATED: 'Game Level Successfully Saved',

        SUCCESS_FETCHED: 'Game Level Successfully Fetched',
        NOT_FOUND: 'Cannot find Game Level',

        STUDENT_GAME_LEVEL_SUCCESS_FETCHED: 'Student game levels successfully fetched',
        STUDENT_GAME_LEVEL_NOT_FOUND: 'Cannot find the student game levels',
        SUCCESS_FETCHED_STORY: 'Story Successfully Fetched',
        NOT_FOUND_STORY: 'Cannot find Story for this level',
        
        SUCCESS_FETCHED_QUESTION: 'Question Successfully Fetched',
        NOT_FOUND_QUESTION: 'Cannot find Question for this story',

        BAD_REQUEST_SUBMIT_QUIZ_ANSWER: 'Cannot find the student game level to update or the game level is already cleared',

        SUCCESS_PROCESS_SUBMIT_QUIZ_ANSWER: 'Quiz answers successfully processed'
    }

    
}