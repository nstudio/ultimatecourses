import { View } from 'tns-core-modules/ui/core/view';
import { isSignInWithAppleSupported } from 'nativescript-apple-sign-in';

declare const ASAuthorizationAppleIDButton;

declare const enum ASAuthorizationAppleIDButtonStyle {
  White = 0,

  WhiteOutline = 1,

  Black = 2,
}

declare const enum ASAuthorizationAppleIDButtonType {
  SignIn = 0,

  Continue = 1,

  Default = 0,
}

export class AppleSignInButton extends View {
  private _tapHandler: NSObject;

  createNativeView() {
    console.log('AppleSignInButton createNativeView');
    if (isSignInWithAppleSupported()) {
      const nativeView = ASAuthorizationAppleIDButton.buttonWithTypeStyle(
        ASAuthorizationAppleIDButtonType.SignIn,
        ASAuthorizationAppleIDButtonStyle.WhiteOutline,
      );
      nativeView.cornerRadius = 50;
      this._tapHandler = AppleSignInButtonTapHandlerImpl.initWithOwner(new WeakRef(this));
      nativeView.addTargetActionForControlEvents(this._tapHandler, 'tap', UIControlEvents.TouchUpInside);
      return nativeView;
    } else {
      return UIView.alloc().initWithFrame(CGRectMake(0, 0, 0, 0));
    }
  }

  initNativeView() {
    super.initNativeView();
  }

  disposeNativeView() {
    // teardown
    this._tapHandler = null;
    super.disposeNativeView();
  }
}

const AppleSignInButtonTapHandlerImpl = (<any>NSObject).extend(
  {
    tap: function(nativeButton: any, nativeEvent: UIEvent) {
      const owner: AppleSignInButton = nativeButton._owner;
      if (owner) {
        owner.notify({
          eventName: 'tap',
          object: owner,
        });
      }
    },
  },
  {
    exposedMethods: {
      tap: {
        returns: interop.types.void,
        params: [interop.types.id, interop.types.id],
      },
    },
  },
);
AppleSignInButtonTapHandlerImpl['initWithOwner'] = function(owner: WeakRef<AppleSignInButton>) {
  const handler = AppleSignInButtonTapHandlerImpl.new();
  handler._owner = owner;
  return handler;
};
