export class QuestionOption {
  id: number;
  text: string;
  score: number;
  question_id: number;
  expanded: boolean; // Agrega la propiedad expanded de tipo boolean
  data: any;

  constructor(id: number, text: string, score: number, question_id: number) {
    this.id = id;
    this.text = text;
    this.score = score;
    this.question_id = question_id;
    this.expanded = false;
  }
}

export class QuestionOptionAdd {
  id: number;
  question: string;
  text: string;
  score: number;

  constructor(id: number, text: string, question: string, score: number) {
    this.id = id;
    this.question = question;
    this.text = text;
    this.score = score;
  }
}
