import {ChangeEvent, FocusEvent, FormEvent, KeyboardEvent, MouseEvent} from 'react';

/**
 * Типы событий для элементов форм
 */

// Change события
export type InputChangeEvent = ChangeEvent<HTMLInputElement>;
export type TextareaChangeEvent = ChangeEvent<HTMLTextAreaElement>;
export type SelectChangeEvent = ChangeEvent<HTMLSelectElement>;
export type FormElementChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

// Focus события
export type InputFocusEvent = FocusEvent<HTMLInputElement>;
export type TextareaFocusEvent = FocusEvent<HTMLTextAreaElement>;
export type FormElementFocusEvent = FocusEvent<HTMLInputElement | HTMLTextAreaElement>;

// Form события
export type FormSubmitEvent = FormEvent<HTMLFormElement>;

// Mouse события
export type ButtonClickEvent = MouseEvent<HTMLButtonElement>;
export type DivClickEvent = MouseEvent<HTMLDivElement>;
export type LinkClickEvent = MouseEvent<HTMLAnchorElement>;

export type ClickEvent = ButtonClickEvent | DivClickEvent | LinkClickEvent;

// Keyboard события
export type InputKeyboardEvent = KeyboardEvent<HTMLInputElement>;
export type TextareaKeyboardEvent = KeyboardEvent<HTMLTextAreaElement>;
