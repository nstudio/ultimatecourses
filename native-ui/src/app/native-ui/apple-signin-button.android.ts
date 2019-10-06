import { View } from 'tns-core-modules/ui/core/view';

declare const android;

export class AppleSignInButton extends View {
  createNativeView() {
    return new android.widget.LinearLayout(this._context);
  }
}
