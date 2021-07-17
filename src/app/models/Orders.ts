export class Orders{
  packageData: Array<packageNested> | undefined
  total:string | undefined

}
export class packageNested{
  packageType:string  | undefined
  qty:string  | undefined
  subTotal:string  | undefined
}
