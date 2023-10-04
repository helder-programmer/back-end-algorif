export interface ICreateQuestionDTO {
    title: string;
    description?: string;
    detailedDescription: string;
    code: string;
    topicId: string;
    difficultyId: string;
    userCreatorId: string;
    classId?: string;
}