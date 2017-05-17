import React from 'react'
import SVGInline from 'react-svg-inline'

const md5 = require('js-md5')
const jdenticon = require('jdenticon')

export default function FleetIcon ({ fleet, size, className }) {
  const hash = md5(fleet.name)
  const svgIcon = jdenticon.toSvg(hash, size)
  return <SVGInline width={String(size)} height={String(size)} svg={svgIcon} className={className} />
}
