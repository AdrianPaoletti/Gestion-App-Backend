import { Schema, model } from "mongoose";

export interface IBlockedDay {
  startDate: Date;
  endDate: Date;
  dates: Array<Date>;
  hours: Array<string>;
}

const blockedDaySchema: Schema<IBlockedDay> = new Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  dates: {
    type: [String],
    required: true,
  },
  hours: {
    type: [String],
    required: false,
  },
});

const BlockedDay = model("BlockedDay", blockedDaySchema, "BlockedDays");

export default BlockedDay;
