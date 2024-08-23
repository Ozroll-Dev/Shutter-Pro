using System;
using System.Collections.Generic;

namespace ShutterPro.Models;

public partial class TpostChangeLog
{
    public int Id { get; set; }

    public int? PsdetailId { get; set; }

    public int? PlantationScheduleListId { get; set; }

    public int? TpostQtyId { get; set; }

    public string? TpostQty { get; set; }

    public int? TpostQtyLocationId { get; set; }

    public string? TpostQtyLocation { get; set; }

    public string? ToCenterTpos1 { get; set; }

    public string? ToCenterTpos2 { get; set; }

    public string? ToCenterTpos3 { get; set; }

    public string? ToCenterTpos4 { get; set; }

    public string? ToCenterTpos5 { get; set; }

    public string? ToCenterTpos6 { get; set; }

    public string? ToCenterTpos7 { get; set; }

    public string? ToCenterTpos8 { get; set; }

    public DateTime? CreatedOn { get; set; }

    public string? CreatedBy { get; set; }

    public bool? IsActive { get; set; }
}
