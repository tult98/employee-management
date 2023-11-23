interface IProps {
  countryCode: string
}

function FlagIcon({ countryCode = '' }: IProps) {
  if (countryCode === 'en') {
    countryCode = 'gb'
  }

  if (countryCode === 'vi') {
    countryCode = 'vn'
  }

  return <span className={`fi inline-block mr-2 fi-${countryCode}`} />
}

export default FlagIcon
