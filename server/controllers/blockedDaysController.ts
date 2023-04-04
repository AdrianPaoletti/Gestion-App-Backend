import express from "express";
import BlockedDay from "../../database/models/blockedDay";
import ErrorCode from "../../interfaces/error";

const getBlockedDays = async (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const actualDate = new Date();
    const query = {
      endDate: {
        $gt: new Date(actualDate.setDate(actualDate.getDate() - 1)),
      },
    };
    const [total, blockedDays] = await Promise.all([
      BlockedDay.countDocuments(query),
      BlockedDay.find(query)
        .sort({ endDate: "ascending" })
        .limit(+limit as number)
        .skip(+limit * (+page - 1)),
    ]);
    if (!blockedDays) {
      const error = new ErrorCode("Could not find blockedDays");
      next(error);
      return;
    }
    res.status(200).json({ total, blockedDays });
  } catch (error) {
    next(error);
  }
};

const getBlockedDaysMonthly = async (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  try {
    const { month = new Date().getMonth(), year = new Date().getFullYear() } =
      req.query;
    const actualDate = new Date();
    const actualDateCondition =
      +month === new Date().getMonth() && +year === new Date().getFullYear();

    const query = {
      endDate: {
        $gt: actualDateCondition
          ? new Date(actualDate.setDate(actualDate.getDate() - 1))
          : new Date(+year, +month, 1),
        $lte: new Date(+year, +month + 1, 0),
      },
    };
    const blockedDays = await BlockedDay.find(query).sort({
      endDate: "ascending",
    });

    if (!blockedDays) {
      const error = new ErrorCode("Could not find blockedDaysMonthly");
      next(error);
      return;
    }

    res.status(200).json(blockedDays);
  } catch (error) {
    next(error);
  }
};

const postBlockedDays = async (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  try {
    const { hours, dates } = req.body;
    const newBlockedDays = await BlockedDay.create({
      startDate: dates[0],
      endDate: dates[dates.length - 1],
      hours: hours,
      dates: dates,
    });
    if (!newBlockedDays) {
      const error = new ErrorCode("Could not add blockedDays");
      next(error);
      return;
    }
    newBlockedDays.save();
    res.status(201).json(newBlockedDays);
  } catch (error) {
    next(error);
  }
};

const deleteBlockedDay = async (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  try {
    const { id } = req.params;
    const blockedDaysDeleted = await BlockedDay.findByIdAndDelete(id);
    console.log(id, blockedDaysDeleted);
    if (!blockedDaysDeleted) {
      const error = new ErrorCode("Could not delete blockedDays");
      next(error);
      return;
    }
    res
      .status(200)
      .json({ msg: "Deleted successfully", deleted: blockedDaysDeleted });
  } catch (error) {
    next(error);
  }
};

export {
  getBlockedDays,
  getBlockedDaysMonthly,
  postBlockedDays,
  deleteBlockedDay,
};
