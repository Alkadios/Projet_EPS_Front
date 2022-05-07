export default class TypeAf {
  label: string;
  value: string;

  private constructor(label: string, value: string) {
    this.label = label;
    this.value = value;
  }

  static AFLP_BAC_PRO = new TypeAf('AFLP Bac pro', 'AFLP BP');
  static AFLP_CAP = new TypeAf('AFLP CAP', 'AFLP CAP');
  static AFL = new TypeAf('AFL', 'AFL');
  static AFC = new TypeAf('AFC', 'AFC');

  static LISTE_TYPE_AF = [this.AFLP_BAC_PRO, this.AFLP_CAP, this.AFL, this.AFC];
}
