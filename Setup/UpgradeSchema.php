<?php
namespace Magento\VersandForm\Setup;


use Magento\Framework\Setup\UpgradeSchemaInterface;
use Magento\Framework\Setup\SchemaSetupInterface;
use Magento\Framework\Setup\ModuleContextInterface;

class UpgradeSchema implements UpgradeSchemaInterface
{
    public function upgrade( SchemaSetupInterface $setup, ModuleContextInterface $context ) {
        $installer = $setup;

        $installer->startSetup();

//        if(version_compare($context->getVersion(), '1.2.0', '<')) {
//            $installer->getConnection()->addColumn(
//                $installer->getTable( 'admin_user' ),
//                'Kundennummer',
//                [
//                    'type' => \Magento\Framework\DB\Ddl\Table::TYPE_TEXT,
//                    'nullable' => true,
//                    'length' => '10',
//                    'comment' => 'This field stores the Customer number',
//                ]
//            );

            $installer->getConnection()->addColumn(
                $installer->getTable( 'admin_user' ),
                'anzahl_auftraege',
                [
                    'type' => \Magento\Framework\DB\Ddl\Table::TYPE_DECIMAL,
                    'nullable' => true,
                ]
            );
//        }



        $installer->endSetup();
    }
}

?>
