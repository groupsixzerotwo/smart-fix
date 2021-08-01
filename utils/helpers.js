//Helper functions
module.exports = {
  format_dates: date => {
    //return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`
    const month = ((new Date(date).getMonth() > 8) ? (new Date(date).getMonth() + 1) : ("0"+ (new Date(date).getMonth() + 1)));
    return `${new Date(date).getFullYear()}-${month}-${new Date(date).getDate()}`
  },
  //Plural for forums
  format_plural: (word, amount) => {
    if (amount!== 1) {
      return `${word}s`;
    }
    return word;
  },
  //Get assignment status
  getAssignStatus: assignment => {
    if (assignment.job.status.id > 2 && assignment.approved_status) {
      return "Accepted";
    } else if (assignment.job.status.id > 2 && !assignment.approved_status) {
      return "Rejected";
    } else {
      return "Processing";
    }
  }
}