<?php

namespace EllisLab\ExpressionEngine\Service\Validation\Rule;

use EllisLab\ExpressionEngine\Service\Validation\ValidationRule;

/**
 * ExpressionEngine - by EllisLab
 *
 * @package        ExpressionEngine
 * @author        EllisLab Dev Team
 * @copyright    Copyright (c) 2003 - 2016, EllisLab, Inc.
 * @license        https://expressionengine.com/license
 * @link        https://ellislab.com
 * @since        Version 3.0
 * @filesource
 */

// ------------------------------------------------------------------------

/**
 * ExpressionEngine Email Validation Rule
 *
 * @package        ExpressionEngine
 * @subpackage    Validation\Rule
 * @category    Service
 * @author        EllisLab Dev Team
 * @link        https://ellislab.com
 */
class Email extends ValidationRule
{

    public function validate($key, $value)
    {
        if ($value != filter_var($value, FILTER_SANITIZE_EMAIL) OR !filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return FALSE;
        }

        return TRUE;
    }

    public function getLanguageKey()
    {
        return 'valid_email';
    }

}

// EOF
