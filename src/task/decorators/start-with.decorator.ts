import { registerDecorator, ValidationOptions } from 'class-validator';

export const StartWith = (prefix: string, validationOptions?: ValidationOptions) => {
	return (object: object, propertyName: string) => {
		registerDecorator({
			name: 'StartsWith',
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: {
				validate(value: any) {
					return typeof value === 'string' && value.startsWith(prefix);
				},
				defaultMessage(): string {
					return `Название должно начинаться на ${prefix}`;
				},
			},
		});
	};
};
