import { useState } from 'react'

export const useColors = (
  colors = { themeColor: '#8c3a00' }
) => useState({ ...immutableColors, ...colors })

export const immutableColors = {
  backgroundColor: '#181a1b',
  fontColor: '#E8E6E3'
}
