interface IFormErrorProps {
  errorMessage: string
}

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }: IFormErrorProps) => (
  <span className="font-medium text-red-500">
    {errorMessage}
  </span>
)