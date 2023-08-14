export interface cmFieldPropType {
  form: any;
  name: string;
  label?: string;
  tipText?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  textSize?: string;
  bottom?: any;
  className?: string;
  onChange?: (value: any) => void;
  onKeyDown?: (value: any) => void;
}
