import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

const KunButton = styled.button({
	color: "pink",
})

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function Button(props: PropsWithChildren<ButtonProps>) {
	const { children, ...rest } = props;
	return <KunButton {...rest}>{children}</KunButton>;
}
export default Button;

