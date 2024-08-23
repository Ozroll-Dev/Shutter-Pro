using System;
using System.Collections.Generic;

namespace ShutterPro.Models;

public partial class PanelChangeLog
{
    public int Id { get; set; }

    public int? PanelDesignId { get; set; }

    public int? Slab { get; set; }

    public int? UpperSlab { get; set; }

    public int? LowerSlab { get; set; }

    public int? UpperGap { get; set; }

    public int? LowerGap { get; set; }

    public bool? Dr { get; set; }

    public int? MidRailHeight { get; set; }

    public DateTime? CreatedOn { get; set; }

    public string? CreatedBy { get; set; }

    public bool? IsActive { get; set; }
}
