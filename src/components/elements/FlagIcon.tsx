interface IProps {
  countryCode: string
}

export const FlagIcon = ({ countryCode = '' }: IProps) => {
  if (countryCode === 'en') {
    countryCode = 'gb'
  }

  if (countryCode === 'vi') {
    countryCode = 'vn'
  }

  return <span className={`fi inline-block mr-2 fi-${countryCode}`} />
}
