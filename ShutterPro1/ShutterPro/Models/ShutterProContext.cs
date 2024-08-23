using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ShutterPro.Models;

public partial class ShutterProContext : DbContext
{
    public ShutterProContext()
    {
    }

    public ShutterProContext(DbContextOptions<ShutterProContext> options)
        : base(options)
    {
    }

    public virtual DbSet<PanelChangeLog> PanelChangeLog { get; set; }

    public virtual DbSet<TblPanelDesign> TblPanelDesign { get; set; }

    public virtual DbSet<TblPlantationJobDetail> TblPlantationJobDetail { get; set; }

    public virtual DbSet<TblProductionScheduleList> TblProductionScheduleList { get; set; }

    public virtual DbSet<TpostChangeLog> TpostChangeLog { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PanelChangeLog>(entity =>
        {
            entity.ToTable("PanelChangeLog");

            entity.Property(e => e.CreatedBy)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedOn)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Dr)
                .HasDefaultValue(false)
                .HasColumnName("DR");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        modelBuilder.Entity<TblPanelDesign>(entity =>
        {
            entity.ToTable("tblPanelDesign");

            entity.Property(e => e.CreatedBy)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedOn)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Dr).HasColumnName("DR");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        modelBuilder.Entity<TblPlantationJobDetail>(entity =>
        {
            entity.HasKey(e => e.PsdetailId).HasName("PK_tblTradesmanPSDetails");

            entity.ToTable("tblPlantationJobDetails");

            entity.Property(e => e.PsdetailId)
                .ValueGeneratedNever()
                .HasColumnName("PSDetailID");
            entity.Property(e => e.AngleBay)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.AngleBayId).HasColumnName("AngleBayID");
            entity.Property(e => e.BayCornerId).HasColumnName("BayCornerID");
            entity.Property(e => e.BladeSize)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.BladeSizeId).HasColumnName("BladeSizeID");
            entity.Property(e => e.Colour)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ColourId).HasColumnName("ColourID");
            entity.Property(e => e.ControlTypeId).HasColumnName("ControlTypeID");
            entity.Property(e => e.CostPrice).HasColumnType("decimal(19, 4)");
            entity.Property(e => e.CostPriceGst)
                .HasColumnType("decimal(19, 4)")
                .HasColumnName("CostPriceGST");
            entity.Property(e => e.ExtrasPrice).HasColumnType("decimal(19, 4)");
            entity.Property(e => e.ExtrasPriceGst)
                .HasColumnType("decimal(19, 4)")
                .HasColumnName("ExtrasPriceGST");
            entity.Property(e => e.FrameType)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FrameTypeId).HasColumnName("FrameTypeID");
            entity.Property(e => e.HingeColour)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.HingeColourId).HasColumnName("HingeColourID");
            entity.Property(e => e.HorizontalTpostHeight).HasColumnName("HorizontalTPostHeight");
            entity.Property(e => e.InstallationArea)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.InstallationAreaId).HasColumnName("InstallationAreaID");
            entity.Property(e => e.Layout)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.LayoutId).HasColumnName("LayoutID");
            entity.Property(e => e.LayoutOther)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.LightBlockId).HasColumnName("LightBlockID");
            entity.Property(e => e.MountConfig)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MountConfigId).HasColumnName("MountConfigID");
            entity.Property(e => e.MountMethod)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MountMethodId).HasColumnName("MountMethodID");
            entity.Property(e => e.MountStyle)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MountStyleId).HasColumnName("MountStyleID");
            entity.Property(e => e.PanelQty)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.PanelQtyId).HasColumnName("PanelQtyID");
            entity.Property(e => e.PelmetTypeId).HasColumnName("PelmetTypeID");
            entity.Property(e => e.PlantationPriceId).HasColumnName("PlantationPriceID");
            entity.Property(e => e.PlantationScheduleListId).HasColumnName("PlantationScheduleListID");
            entity.Property(e => e.RemakeTypeId).HasColumnName("RemakeTypeID");
            entity.Property(e => e.RoomLocation)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.RoomLocationId).HasColumnName("RoomLocationID");
            entity.Property(e => e.RoomLocationOther)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.SalePrice).HasColumnType("decimal(19, 4)");
            entity.Property(e => e.SalePriceGst)
                .HasColumnType("decimal(19, 4)")
                .HasColumnName("SalePriceGST");
            entity.Property(e => e.ShutterId).HasColumnName("ShutterID");
            entity.Property(e => e.Sides)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.SidesId).HasColumnName("SidesID");
            entity.Property(e => e.SillCutZframeId).HasColumnName("SillCutZFrameID");
            entity.Property(e => e.SlidingGuide)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.SlidingGuideId).HasColumnName("SlidingGuideID");
            entity.Property(e => e.SlidingOpenClose)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.SlidingOpenCloseId).HasColumnName("SlidingOpenCloseID");
            entity.Property(e => e.SpecialRequirements).HasColumnType("text");
            entity.Property(e => e.SplitBlade)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.SplitBladeId).HasColumnName("SplitBladeID");
            entity.Property(e => e.ToCenterTpos1)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("ToCenterTPos1");
            entity.Property(e => e.ToCenterTpos2)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("ToCenterTPos2");
            entity.Property(e => e.ToCenterTpos3)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("ToCenterTPos3");
            entity.Property(e => e.ToCenterTpos4)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("ToCenterTPos4");
            entity.Property(e => e.ToCenterTpos5)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("ToCenterTPos5");
            entity.Property(e => e.ToCenterTpos6)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("ToCenterTPos6");
            entity.Property(e => e.ToCenterTpos7)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("ToCenterTPos7");
            entity.Property(e => e.ToCenterTpos8)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("ToCenterTPos8");
            entity.Property(e => e.TpostQty)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("TPostQty");
            entity.Property(e => e.TpostQtyId).HasColumnName("TPostQtyID");
            entity.Property(e => e.TpostQtyLocation)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("TPostQtyLocation");
            entity.Property(e => e.TpostQtyLocationId).HasColumnName("TPostQtyLocationID");
        });

        modelBuilder.Entity<TblProductionScheduleList>(entity =>
        {
            entity.ToTable("tblProductionScheduleList");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.ActualShippingDate).HasColumnType("datetime");
            entity.Property(e => e.AddressZoneId).HasColumnName("AddressZoneID");
            entity.Property(e => e.Bomcosted)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("BOMCosted");
            entity.Property(e => e.CollectedBy).HasMaxLength(255);
            entity.Property(e => e.CollectedFactoryDate).HasColumnType("datetime");
            entity.Property(e => e.CompletedDate).HasColumnType("datetime");
            entity.Property(e => e.CostPrice).HasColumnType("decimal(19, 4)");
            entity.Property(e => e.CostPriceGst)
                .HasColumnType("decimal(19, 4)")
                .HasColumnName("CostPriceGST");
            entity.Property(e => e.CreditOverrideDateTime).HasColumnType("datetime");
            entity.Property(e => e.CreditOverrideUserId).HasColumnName("CreditOverrideUserID");
            entity.Property(e => e.CustomerName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.DeliveryAddressId).HasColumnName("DeliveryAddressID");
            entity.Property(e => e.EnteredDatetime).HasColumnType("datetime");
            entity.Property(e => e.EnteredShutterProDate).HasColumnType("datetime");
            entity.Property(e => e.ExpectedShippingDate).HasColumnType("datetime");
            entity.Property(e => e.FreightAmount).HasColumnType("decimal(19, 4)");
            entity.Property(e => e.FreightAmountGst)
                .HasColumnType("decimal(19, 4)")
                .HasColumnName("FreightAmountGST");
            entity.Property(e => e.GraNumber).HasDefaultValue(0);
            entity.Property(e => e.Graremakes)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("GRARemakes");
            entity.Property(e => e.InvoicedDate).HasColumnType("datetime");
            entity.Property(e => e.ManufacturingDate).HasColumnType("datetime");
            entity.Property(e => e.OrderDate).HasColumnType("datetime");
            entity.Property(e => e.OrderReference)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.OrderTypeId).HasColumnName("OrderTypeID");
            entity.Property(e => e.OriginalOrderNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.OutstandingItemsConfirmDateTime).HasColumnType("datetime");
            entity.Property(e => e.OutstandingItemsConfirmId).HasColumnName("OutstandingItemsConfirmID");
            entity.Property(e => e.OzrollContractNo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PickingDate).HasColumnType("datetime");
            entity.Property(e => e.PlannedShippingDate)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ProductTypeId).HasColumnName("ProductTypeID");
            entity.Property(e => e.PromisedDate).HasColumnType("datetime");
            entity.Property(e => e.QtyLframe).HasColumnName("QtyLFrame");
            entity.Property(e => e.QtyZframe).HasColumnName("QtyZFrame");
            entity.Property(e => e.QuoteExpiryDateTime).HasColumnType("datetime");
            entity.Property(e => e.ReceivedDate).HasColumnType("datetime");
            entity.Property(e => e.RemakeIssueDescription).HasColumnType("text");
            entity.Property(e => e.RemakeLiablePartyId).HasColumnName("RemakeLiablePartyID");
            entity.Property(e => e.RemakeReasonId).HasColumnName("RemakeReasonID");
            entity.Property(e => e.RetailDiscount).HasColumnType("decimal(19, 4)");
            entity.Property(e => e.SalePrice).HasColumnType("decimal(19, 4)");
            entity.Property(e => e.SalePriceGst)
                .HasColumnType("decimal(19, 4)")
                .HasColumnName("SalePriceGST");
            entity.Property(e => e.ScheduledDate).HasColumnType("datetime");
            entity.Property(e => e.ShippingDetails)
                .HasMaxLength(2000)
                .IsUnicode(false);
            entity.Property(e => e.ShutterPro)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ShutterProNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SybizJobCode)
                .HasMaxLength(25)
                .HasDefaultValue("");
            entity.Property(e => e.SybizSalesInvoiceNumber)
                .HasMaxLength(25)
                .HasDefaultValue("");
            entity.Property(e => e.TotalSqm).HasColumnName("TotalSQM");
            entity.Property(e => e.UpdatesText).HasColumnType("text");
        });

        modelBuilder.Entity<TpostChangeLog>(entity =>
        {
            entity.ToTable("TPostChangeLog");

            entity.Property(e => e.CreatedBy)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedOn)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ToCenterTpos1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ToCenterTPos1");
            entity.Property(e => e.ToCenterTpos2)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ToCenterTPos2");
            entity.Property(e => e.ToCenterTpos3)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ToCenterTPos3");
            entity.Property(e => e.ToCenterTpos4)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ToCenterTPos4");
            entity.Property(e => e.ToCenterTpos5)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ToCenterTPos5");
            entity.Property(e => e.ToCenterTpos6)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ToCenterTPos6");
            entity.Property(e => e.ToCenterTpos7)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ToCenterTPos7");
            entity.Property(e => e.ToCenterTpos8)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ToCenterTPos8");
            entity.Property(e => e.TpostQty)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("TPostQty");
            entity.Property(e => e.TpostQtyId).HasColumnName("TPostQtyId");
            entity.Property(e => e.TpostQtyLocation)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("TPostQtyLocation");
            entity.Property(e => e.TpostQtyLocationId).HasColumnName("TPostQtyLocationId");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
