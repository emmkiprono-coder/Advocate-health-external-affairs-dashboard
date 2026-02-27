import "react";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    children?: ReactNode | undefined;
  }
  interface SVGAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    children?: ReactNode | undefined;
  }
}
